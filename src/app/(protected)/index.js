import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


const movieData = {
  sciFi: [
    { id: "1", title: "Interstellar", cover: "https://cdn-images.dzcdn.net/images/cover/5a02690056ec7f97030788109498ac5a/0x1900-000000-80-0-0.jpg", synopsis: "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço em uma tentativa de salvar a humanidade." },
    { id: "2", title: "Blade Runner 2049", cover: "https://vice-press.com/cdn/shop/products/blade-runner-2049-matt-ferguson-editions-poster.jpg?v=1690970574&width=1024", synopsis: "Trinta anos após os eventos do primeiro filme, um novo blade runner descobre um segredo enterrado há muito tempo." },
    { id: "3", title: "Dune", cover: "https://upload.wikimedia.org/wikipedia/pt/thumb/a/a3/Dune_2021.jpeg/230px-Dune_2021.jpeg", synopsis: "Um jovem herdeiro enfrenta intrigas políticas e conflitos ao assumir um papel crucial no destino de seu povo e planeta." }
  ],
  action: [
    { id: "4", title: "Mad Max: Fury Road", cover: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10854488_p_v8_ac.jpg", synopsis: "Em um futuro pós-apocalíptico, Max e Furiosa lutam para sobreviver em meio ao caos e opressão." },
    { id: "5", title: "John Wick", cover: "https://upload.wikimedia.org/wikipedia/pt/1/13/John_wick_ver3.jpg", synopsis: "Um assassino aposentado retorna ao submundo em busca de vingança após perder tudo o que amava." },
    { id: "6", title: "Gladiator", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWeZN-oy7uEwfkW6IFOh4ecaL7zCFvdsFyeMxbC0nncVSsSW_tA86GQQHbtAS10PJkm9Q&usqp=CAU", synopsis: "Um general romano traído busca vingança enquanto luta como gladiador no coliseu." }
  ],
  suspense: [
    { id: "7", title: "Se7en", cover: "https://br.web.img3.acsta.net/pictures/210/124/21012465_2013061319170245.jpg", synopsis: "Dois detetives caçam um assassino em série que comete crimes inspirados nos sete pecados capitais." },
    { id: "8", title: "The Silence of the Lambs", cover: "https://m.media-amazon.com/images/M/MV5BNDdhOGJhYzctYzYwZC00YmI2LWI0MjctYjg4ODdlMDExYjBlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", synopsis: "Uma jovem agente do FBI busca a ajuda de um brilhante psiquiatra para capturar um assassino em série." },
    { id: "9", title: "Gone Girl", cover: "https://upload.wikimedia.org/wikipedia/pt/d/d9/Gonegirlposter.jpg", synopsis: "O desaparecimento de uma esposa leva a mídia e a polícia a investigar, enquanto segredos sombrios vêm à tona." }
  ],
};


export default function Home() {
  const [activeTab, setActiveTab] = useState("sciFi");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  const handleMoviePress = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };


  const renderMovieCard = ({ item, index }) => {
    const isThirdCard = index === 2;
    return (
      <TouchableOpacity
        style={[styles.card, isThirdCard && styles.thirdCard]} // Add conditional style for third card
        onPress={() => handleMoviePress(item)}
      >
        <Image source={{ uri: item.cover }} style={styles.image} />
        <View style={styles.gradientOverlay} />
        <Text style={styles.movieTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };


  const filteredMovies = movieData[activeTab].filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <View style={styles.container}>
      {/* Header with search */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar filmes..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <MaterialIcons name="search" size={24} color="#aaa" />
      </View>


      {/* Abas */}
      <View style={styles.tabContainer}>
        {["sciFi", "action", "suspense"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <View style={styles.tabTextContainer}>
              <Text style={styles.tabText}>
                {tab === "sciFi" ? "Sci-Fi" : tab === "action" ? "Ação" : "Suspense"}
              </Text>
              <MaterialIcons
                name={tab === "sciFi" ? "flight" : tab === "action" ? "whatshot" : "visibility"}
                size={20}
                color="#aaa"
                style={styles.tabIcon}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>


      {/* Cards */}
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        renderItem={renderMovieCard}
        contentContainerStyle={styles.cardContainer}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />


      {/* Modal de Sinopse */}
      {selectedMovie && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedMovie.cover }} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{selectedMovie.title}</Text>
              <Text style={styles.modalSynopsis}>{selectedMovie.synopsis}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    marginRight: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tabButton: {
    paddingVertical: 10,
    alignItems: "center",
    flex: 1,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#6200ea",
  },
  tabTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabText: {
    color: "#aaa",
    fontSize: 14,
    marginRight: 5,
  },
  tabIcon: {
    marginLeft: 5,
  },
  cardContainer: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#333",
    overflow: "hidden",
    position: "relative",
  },
  thirdCard: {
    width: "80%", // narrower third card
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 10,
  },
  movieTitle: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: 300,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSynopsis: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#6200ea",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});





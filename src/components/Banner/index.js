import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";


export function Banner() {
    const [page, setPage] = useState(0);

    const onPageSelected = (e) => {
        setPage(e.nativeEvent.position);
    };

    return (
        <View style={styles.container}>
            <PagerView initialPage={0} style={styles.content} onPageSelected={onPageSelected}>
                <View key="1" style={styles.page}>
                    <Image
                        source={{ uri: 'https://www.radiocacula.com.br/wp-content/uploads/2023/12/870886.jpg' }}
                        style={styles.bannerImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.text}>Banner 1</Text>
                </View>
                <View key="2" style={styles.page}>
                    <Image
                        source={{ uri: 'https://media.gazetadopovo.com.br/2015/09/2b33b116ba95cf5827dce2f2dafd3e18-gpLarge.jpg' }}
                        style={styles.bannerImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.text}>Banner 2</Text>
                </View>
                <View key="3" style={styles.page}>
                    <Image
                        source={{ uri: 'https://assets.mubicdn.net/images/film/22845/image-w1280.jpg?1543863611' }}
                        style={styles.bannerImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.text}>Banner 3</Text>
                </View>
            </PagerView>
            <View style={styles.bulletContent}>
                <View style={[styles.bullet, page === 0 && styles.activeBullet]}></View>
                <View style={[styles.bullet, page === 1 && styles.activeBullet]}></View>
                <View style={[styles.bullet, page === 2 && styles.activeBullet]}></View>
            </View>
            <View>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'bold',
                    marginTop: 20,
                    textAlign: 'center',
                }}>Mês do Sci-fi</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    content: {
        marginTop: 10,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    page: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
    },

    bulletContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bullet: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 10,
        backgroundColor: '#999'
    },

    activeBullet: {
        backgroundColor: '#000',
    },

    text: {
        fontSize: 20,
        fontFamily: 'bold',
        marginTop: 20,
    },
    bannerImage: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginTop: 50,
    }
});
import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Concert } from "../../utils/types";
import UserHeader from "../../components/Header/UserHeader";
import ConcertGrid from "../../components/ConcertGrid/ConcertGrid";
import { useSpotifyTokenStore } from "../../stores/spotifyTokenStore";
import { fetchFavoriteConcerts } from "../../services/concertService";
import Loading from "../../components/Loading/Loading";
import { styles } from "./styles";

export default function FavoriteConcertsScreen() {
  const [favoriteConcerts, setFavoriteConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);

  const accessToken = useSpotifyTokenStore((state) => state.spotifyToken);

  useEffect(() => {
    const fetchConcerts = async () => {
      if (accessToken) {
        const favoriteConcerts = await fetchFavoriteConcerts(accessToken);
        setFavoriteConcerts(favoriteConcerts);
      }
      setLoading(false);
    };
    fetchConcerts();
  }, []);

  return (
    <View style={styles.container}>
      <UserHeader />
      {loading ? <Loading /> : <ConcertGrid concerts={favoriteConcerts} header="İlgini çekebilecek konserler" text="" />}
    </View>
  );
}

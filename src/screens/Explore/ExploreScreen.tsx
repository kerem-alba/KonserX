import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { currentCity } from "../../utils/constants";
import { genres } from "../../utils/constants";
import { ConcertWithDetails } from "../../utils/types";
import { getFilteredConcerts } from "../../api/concertsApi";
import UserHeader from "../../components/Header/UserHeader";
import ConcertCard3 from "../../components/ConcertCards/ConcertCard3";
import Loading from "../../components/Loading/Loading";
import { styles } from "./styles";

export default function ExploreScreen() {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("Tüm");
  const [selectedCustomDate, setSelectedCustomDate] = useState<Date | null>(null);
  const [filteredConcerts, setFilteredConcerts] = useState<ConcertWithDetails[]>([]);
  const [visibleConcertCount, setVisibleConcertCount] = useState(8);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const cityOptions = ["Tüm", "İstanbul", "Ankara", currentCity.value];
  const genreOptions = ["Tüm", ...genres.value];
  const dateOptions = ["Tüm", "Bugün", "Bu Hafta", "Bu Ay", "Tarih Seç"];

  const fetchConcerts = async () => {
    const formattedGenres = selectedGenres.includes("Tüm") ? [] : selectedGenres;
    const formattedCities = selectedCities.includes("Tüm") ? [] : selectedCities;

    const dateRange =
      selectedDate === "Tarih Seç"
        ? { start: selectedCustomDate?.toISOString() || null, end: selectedCustomDate?.toISOString() || null }
        : selectedDate === "Bugün"
        ? { start: new Date().toISOString(), end: new Date().toISOString() }
        : selectedDate === "Bu Hafta"
        ? { start: startOfWeek(new Date()).toISOString(), end: endOfWeek(new Date()).toISOString() }
        : selectedDate === "Bu Ay"
        ? { start: startOfMonth(new Date()).toISOString(), end: endOfMonth(new Date()).toISOString() }
        : null;
    mutation.mutate({ genres: formattedGenres, cities: formattedCities, dateRange });
  };

  const mutation = useMutation({
    mutationKey: ["filteredConcerts"],
    mutationFn: ({
      genres,
      cities,
      dateRange,
    }: {
      genres: string[];
      cities: string[];
      dateRange: { start: string | null; end: string | null } | null;
    }) => getFilteredConcerts(genres, cities, dateRange),
    onSuccess: (data) => {
      setFilteredConcerts(data);
    },
    onError: (error) => {
      console.error("Konserler alınırken hata oluştu:", error);
    },
  });

  useEffect(() => {
    fetchConcerts();
  }, [selectedCities, selectedGenres, selectedDate, selectedCustomDate]);

  const loadMoreConcerts = () => {
    setVisibleConcertCount((prevCount) => prevCount + 8);
  };

  const toggleCity = (city: string) => {
    setSelectedCities((prevCities) => {
      if (city === "Tüm") {
        return [];
      }

      if (city === "İstanbul") {
        const istanbulCities = ["İstanbul Avrupa", "İstanbul Asya"];
        return prevCities.some((c) => istanbulCities.includes(c))
          ? prevCities.filter((c) => !istanbulCities.includes(c))
          : [...prevCities.filter((c) => c !== "Tüm"), ...istanbulCities];
      }

      return prevCities.includes(city) ? prevCities.filter((c) => c !== city) : [...prevCities.filter((c) => c !== "Tüm"), city];
    });
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prevGenres) => {
      if (genre === "Tüm") {
        return [];
      }
      return prevGenres.includes(genre) ? prevGenres.filter((g) => g !== genre) : [...prevGenres.filter((g) => g !== "Tüm"), genre];
    });
  };

  const toggleDate = (date: string) => {
    setSelectedDate(date);
    if (date === "Tarih Seç") {
      setShowDatePicker(true);
    } else {
      setSelectedCustomDate(null);
    }
  };

  const onChangeCustomDate = (event: any, date: Date | undefined) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedCustomDate(date);
    }
  };

  return (
    <View style={styles.container}>
      <UserHeader />
      <View style={styles.gridContainer}>
        <View style={styles.citySelection}>
          {cityOptions.map((city) => (
            <TouchableOpacity key={city} onPress={() => toggleCity(city)}>
              <Text
                style={[
                  styles.cityText,
                  city === "Tüm" && selectedCities.length === 0 && styles.selectedCityText,
                  city === "İstanbul" && selectedCities.includes("İstanbul Avrupa") && styles.selectedCityText,
                  city !== "Tüm" && city !== "İstanbul" && selectedCities.includes(city) && styles.selectedCityText,
                ]}
              >
                {city}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.genreSelection}>
          {genreOptions.map((genre) => (
            <TouchableOpacity key={genre} onPress={() => toggleGenre(genre)}>
              <Text
                style={[
                  styles.genreText,
                  (selectedGenres.includes(genre) || (genre === "Tüm" && selectedGenres.length === 0)) && styles.selectedGenreText,
                ]}
              >
                {genre}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.dateSelection}>
          {dateOptions.map((date) => (
            <TouchableOpacity key={date} onPress={() => toggleDate(date)}>
              <Text style={[styles.dateText, selectedDate === date && styles.selectedDateText]}>{date}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {showDatePicker && <DateTimePicker value={selectedCustomDate || new Date()} mode="date" display="default" onChange={onChangeCustomDate} />}

        {mutation.isPending ? (
          <Loading />
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: 50 }}
            data={filteredConcerts.slice(0, visibleConcertCount)}
            numColumns={2}
            renderItem={({ item }) => <ConcertCard3 concert={item} />}
            keyExtractor={(item, index) => `${item.Id}-${index}`}
            onEndReached={loadMoreConcerts}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
    </View>
  );
}

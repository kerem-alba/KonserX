export type RootStackParamList = {
  Home: undefined;
  Explore: undefined;
  Login: undefined;
  Intro: undefined;
  Main: { screen: "Home" | "Explore" };
  ConcertDetails: { id: number };
  PopularConcerts: undefined;
  FavoriteConcerts: undefined;
};

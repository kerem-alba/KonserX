export type RootStackParamList = {
  Home: undefined;
  Explore: undefined;
  Login: undefined;
  Register: undefined;
  Logout: undefined;
  Intro: undefined;
  Main: { screen: "Home" | "Explore" };
  ConcertDetails: { id: number };
  PopularConcerts: undefined;
  FavoriteConcerts: undefined;
  Spotify: undefined;
};

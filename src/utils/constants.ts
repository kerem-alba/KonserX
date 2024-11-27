export const header = {
  token: "",
};

export const api_header = (): Headers => {
  const FETCH_HEADER = new Headers();
  FETCH_HEADER.append("Content-Type", "application/json");
  if (header.token) {
    FETCH_HEADER.append("Authorization", `Bearer ${header.token}`);
  }
  return FETCH_HEADER;
};

export const api_header_register = (): Headers => {
  const FETCH_HEADER = new Headers();
  FETCH_HEADER.append("Content-Type", "application/json");
  return FETCH_HEADER;
};

// src/hooks/getLokasi.ts

export const getLocation = async (latitude: string, longitude: string) => {
  try {
    const response = await fetch(
      `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=670f610363d58923134542nkt4717c9`
    );
    const data = await response.json();
    return data.display_name;
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
};

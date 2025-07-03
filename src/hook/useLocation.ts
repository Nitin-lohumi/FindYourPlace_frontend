import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLocation, setLocationStatus } from "@/store/Slices/locationSlice";
export const useLocation = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let locationFetched = false;
    const checkLocation = () => {
      if (locationFetched) return;
      if (!navigator.geolocation) {
        dispatch(
          setLocationStatus({ granted: false, denied: true, checked: true })
        );
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          locationFetched = true;
          dispatch(
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          );
          dispatch(
            setLocationStatus({ granted: true, denied: false, checked: true })
          );
        },
        (error) => {
          locationFetched = true;
          if (error.code === 1) {
            dispatch(
              setLocationStatus({ granted: false, denied: true, checked: true })
            );
          } else {
            dispatch(
              setLocationStatus({
                granted: false,
                denied: false,
                checked: true,
              })
            );
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    };

    checkLocation();

    const interval = setInterval(() => {
      if (!locationFetched) checkLocation();
    }, 15000);

    return () => clearInterval(interval);
  }, [dispatch]);
};

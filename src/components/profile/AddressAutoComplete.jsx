import { Autocomplete } from "@react-google-maps/api";
import { useRef } from "react";

function AddressAutoComplete({ onSelect }) {
  const autoCompleteRef = useRef(null);

  const onPlaceChanged = () => {
    const place = autoCompleteRef.current.getPlace();

    const address = {
      addressLine1: place.formatted_address || "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    };

    place.address_components?.forEach((c) => {
      if (c.types.includes("locality")) address.city = c.long_name;
      if (c.types.includes("administrative_area_level_1"))
        address.state = c.long_name;
      if (c.types.includes("country")) address.country = c.long_name;
      if (c.types.includes("postal_code")) address.pincode = c.long_name;
    });

    onSelect(address);
  };

  return (
    <Autocomplete
      onLoad={(ref) => (autoCompleteRef.current = ref)}
      onPlaceChanged={onPlaceChanged}
    >
      <input
        type="text"
        className="form-control"
        placeholder="Search address"
      />
    </Autocomplete>
  );
}

export default AddressAutoComplete;

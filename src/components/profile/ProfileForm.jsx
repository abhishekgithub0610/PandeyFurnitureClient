import { useState, useEffect } from "react";
import AddressAutoComplete from "./AddressAutoComplete";

function ProfileForm({ profile, onSubmit, isSubmitting }) {
  const [form, setForm] = useState({
    email: "",
    phoneNumber: "",
    city: "",
    pincode: "",
  });

  // Sync form when profile loads
  useEffect(() => {
    if (profile) {
      setForm({
        email: profile.email,
        phoneNumber: profile.phoneNumber || "",
        city: profile.address?.city || "",
        pincode: profile.address?.pincode || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <div className="mb-3">
        <label>Email</label>
        <input className="form-control" value={form.email} disabled />
      </div>

      <div className="mb-3">
        <label>Phone</label>
        <input
          className="form-control"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Address</label>
        <AddressAutoComplete
          onSelect={(addr) =>
            setForm((prev) => ({
              ...prev,
              city: addr.city,
              pincode: addr.pincode,
            }))
          }
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label>City</label>
          <input className="form-control" value={form.city} readOnly />
        </div>

        <div className="col-md-6 mb-3">
          <label>Pincode</label>
          <input className="form-control" value={form.pincode} readOnly />
        </div>
      </div>

      <button className="btn btn-primary w-100" disabled={isSubmitting}>
        Save Changes
      </button>
    </form>
  );
}

export default ProfileForm;

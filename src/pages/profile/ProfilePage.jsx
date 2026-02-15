import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../store/api/profileApi";
import ProfileForm from "../../components/profile/ProfileForm";
import { toast } from "react-toastify";

function ProfilePage() {
  const { data, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isSubmitting }] =
    useUpdateProfileMutation();

  if (isLoading) return <p>Loading...</p>;

  const profile = data?.result;

  const handleSubmit = async (form) => {
    try {
      await updateProfile(form).unwrap();
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-3">My Profile</h4>

              <ProfileForm
                profile={profile}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

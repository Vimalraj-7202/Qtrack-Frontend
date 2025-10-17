import CommonTitle from "@/common/Title";
import { TextField } from "@mui/material";

const Settings = () => {
  return (
    <>
      <CommonTitle
        title="Settings"
        subTitle="Update your profile and preferences."
      />

      <TextField>Name</TextField>
      <TextField>Email</TextField>
    </>
  );
};

export default Settings;

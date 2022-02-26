import { Box, Button, Grid, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { CreateUserDtoWithConfirm } from "../../../common/schema/user";
import { mergeObject } from "../../../common/utils/merge";
import {
  CreateUserDtoWithConfirmErrors,
  userService,
} from "../../../controller/user";

import styles from "./HomePage.module.less";

let HomePage: React.FC = () => {
  const [formData, setFormData] = useState<CreateUserDtoWithConfirm>({
    name: "",
    password: "",
    email: "",
    confirm: "",
    tags: ["dd"],
  });

  const [formErrors, setFormErrors] = useState<CreateUserDtoWithConfirmErrors>(
    {}
  );

  const handleFormDataChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData(mergeObject(formData, e.target.id, e.target.value));
  };

  const handleFormDataSubmit = async () => {
    console.log(formData);
    const res = await userService.createUser(formData);
    if (res.status === "rejected") {
      setFormErrors(res.errors);
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={styles.container}
    >
      <Box maxWidth={"300px"}>
        <TextField
          id="name"
          label="name"
          value={formData.name}
          onChange={handleFormDataChange}
          error={!!formErrors.name}
          helperText={formErrors.name ? formErrors.name[0] : null}
        />
        <TextField
          id="email"
          label="email"
          value={formData.email}
          onChange={handleFormDataChange}
          error={!!formErrors.email}
          helperText={formErrors.email ? formErrors.email[0] : null}
        />
        <TextField
          id="password"
          label="password"
          value={formData.password}
          onChange={handleFormDataChange}
          error={!!formErrors.password}
          helperText={formErrors.password ? formErrors.password[0] : null}
        />
        <TextField
          id="confirm"
          label="confirm password"
          value={formData.confirm}
          onChange={handleFormDataChange}
          error={!!formErrors.confirm}
          helperText={formErrors.confirm ? formErrors.confirm[0] : null}
        />
      </Box>
      <Button onClick={handleFormDataSubmit}>submit</Button>
    </Grid>
  );
};

HomePage = observer(HomePage);

export default HomePage;

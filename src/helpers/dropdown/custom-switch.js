import React, { FormControl, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useState } from "react";

export default function CustomSwitch({
    defaultChecked = false,
    label = 'label name',
    changeCallBack
}) {
    const [checked, setChecked] = useState(defaultChecked);
    const handleChange = (event) => {
        setChecked(event.target.checked);
        changeCallBack(event.target.checked)
    };

    return (
        <FormControl >
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                        />
                    }
                    label={label}
                />
            </FormGroup>
        </FormControl>
    )
}
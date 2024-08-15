import * as forms from "codeforlife/components/form"
import { type FC } from "react"
import { FormHelperText } from "@mui/material"
import { submitForm } from "codeforlife/utils/form"

import { fruitNameSchema } from "../../app/schemas"
import { useCreateFruitMutation } from "../../api/fruit"

export interface CreateFruitFormProps {}

const CreateFruitForm: FC<CreateFruitFormProps> = () => {
  const [createFruit] = useCreateFruitMutation()

  return (
    <>
      <FormHelperText>
        Use this form to add a new fruit to the list
      </FormHelperText>
      <forms.Form
        initialValues={{ name: "", is_citrus: false }}
        onSubmit={submitForm(createFruit, {
          then: () => {
            alert("successfully created fruit!")
          },
        })}
      >
        <forms.TextField required name="name" schema={fruitNameSchema} />
        <forms.CheckboxField
          name="is_citrus"
          formControlLabelProps={{ label: "Is Citrus" }}
        />
        <forms.SubmitButton>Create fruit</forms.SubmitButton>
      </forms.Form>
    </>
  )
}

export default CreateFruitForm

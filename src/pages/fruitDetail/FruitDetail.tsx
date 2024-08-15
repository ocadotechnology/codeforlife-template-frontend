import * as forms from "codeforlife/components/form"
import * as pages from "codeforlife/components/page"
import * as yup from "yup"
import { Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { handleQueryState } from "codeforlife/utils/api"
import { submitForm } from "codeforlife/utils/form"
import { useParamsRequired } from "codeforlife/hooks"

import {
  useLazyRetrieveFruitQuery,
  useUpdateFruitMutation,
} from "../../api/fruit"
import { fruitNameSchema } from "../../app/schemas"
import { paths } from "../../routes"

export interface FruitDetailProps {}

const FruitDetail: FC<FruitDetailProps> = () => {
  const [updateFruit] = useUpdateFruitMutation()
  const [retrieveFruit, retrieveFruitResult] = useLazyRetrieveFruitQuery()

  return useParamsRequired({
    shape: { id: yup.number().required().min(1) },
    children: () =>
      handleQueryState(retrieveFruitResult, fruit => (
        <pages.Page>
          <pages.Section>
            <Typography variant="h1">Update fruit</Typography>
            <forms.Form
              initialValues={fruit}
              onSubmit={submitForm(updateFruit, {
                exclude: ["expires_on"],
                then: () => {
                  alert("successfully updated fruit")
                },
              })}
            >
              <Stack>
                <forms.TextField
                  name="name"
                  label="Name"
                  placeholder="Enter the fruit's name"
                  schema={fruitNameSchema}
                />
                <forms.CheckboxField
                  name="is_citrus"
                  formControlLabelProps={{ label: "Is Citrus" }}
                />
                <forms.SubmitButton>Update fruit</forms.SubmitButton>
              </Stack>
            </forms.Form>
            <Link className="back-to" to={paths.fruits._}>
              fruit list
            </Link>
          </pages.Section>
        </pages.Page>
      )),
    onValidationSuccess: params => {
      retrieveFruit(params.id)
    },
    onValidationError: navigate => {
      navigate(paths.fruits._, {
        state: {
          notifications: [
            { props: { error: true, children: "Failed to get params" } },
          ],
        },
      })
    },
  })
}

export default FruitDetail
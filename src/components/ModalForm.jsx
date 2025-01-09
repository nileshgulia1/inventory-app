import React from "react";

import {
  ModalContent,
  ModalActions,
  Modal,
  Button,
  FormInput,
  FormGroup,
  Header,
  Form,
  Icon,
} from "semantic-ui-react";

function ModalForm({ onSubmit, setOpen, open, element }) {
  const {
    category = "",
    price = "",
    quantity = "",
    value = "",
  } = element || {};
  const [formData, setFormData] = React.useState({
    category,
    price,
    quantity,
    value,
  });

  React.useEffect(() => {
    setFormData({
      category,
      price,
      quantity,
      value,
    });
  }, [category, price, quantity, value]);

  const handleChange = (e, { name, value }) => {
    let newValue = formData.value;
    if (name === "quantity") {
      newValue = Number(value) * Number(formData.price.replace("$", ""));
    } else if (name === "price") {
      newValue = Number(value.replace("$", "")) * Number(formData.quantity);
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      value: `$${newValue}`,
    }));
  };

  const handleClose = React.useCallback(() => {
    setFormData({
      category,
      price,
      quantity,
      value,
    });
    setOpen(false);
  }, [category, price, quantity, value, setOpen]);

  const handleSubmit = React.useCallback(
    (e) => {
      const value =
        Number(formData.quantity) * Number(formData.price.replace("$", ""));
      e.preventDefault();
      setOpen(false);
      onSubmit({
        ...element, //also send rest of the element
        ...formData,
        value: `$${value}`,
      });
    },
    [element, formData, onSubmit, setOpen]
  );
  return (
    <Modal
      closeIcon
      basic
      dimmer="inverted"
      open={open}
      size="small"
      onClose={handleClose}
      className="modal-form"
    >
      <Header inverted style={{ color: "#fff" }}>
        Edit Product:
        <Header sub>{element?.name}</Header>
      </Header>

      <ModalContent inverted>
        <Form onSubmit={handleSubmit} inverted>
          <FormGroup widths="equal">
            <FormInput
              fluid
              name="category"
              label="Category"
              value={formData.category}
              onChange={handleChange}
              inverted
            />
            <FormInput
              fluid
              name="price"
              label="Price"
              value={formData.price}
              onChange={handleChange}
              inverted
            />
          </FormGroup>
          <FormGroup widths="equal">
            <FormInput
              fluid
              name="quantity"
              label="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              inverted
            />
            <FormInput
              fluid
              name="value"
              label="Value"
              value={formData.value}
              inverted
              disabled
            />
          </FormGroup>
          <ModalActions style={{ textAlign: "right" }}>
            <Button onClick={handleClose} inverted>
              <Icon name="" /> Cancel
            </Button>
            <Button type="submit" inverted>
              <Icon name="checkmark" /> Submit
            </Button>
          </ModalActions>
        </Form>
      </ModalContent>
    </Modal>
  );
}

export default ModalForm;

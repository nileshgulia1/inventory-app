import React, { useState, useEffect, useMemo } from "react";
import cx from "classnames";
import { Table, Button, Header, Grid, Segment, Icon } from "semantic-ui-react";

import ModalForm from "./ModalForm";
import "./AdminView.css";

const AdminView = ({ inventory, isAdmin }) => {
  const [data, setData] = useState(inventory ?? []);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const calculateMetrics = useMemo(() => {
    return data.reduce(
      (acc, item) => {
        const value = Number(String(item.value).replace("$", ""));
        const quantity = Number(item.quantity);

        acc.totalProducts++;
        acc.totalValue += value;
        if (quantity === 0) acc.outOfStock++;
        acc.categories.add(item.category);

        return acc;
      },
      {
        totalProducts: 0,
        totalValue: 0,
        outOfStock: 0,
        categories: new Set(),
      }
    );
  }, [data]);

  const { totalProducts, totalValue, outOfStock, categories } =
    calculateMetrics; //use a state

  const handleDelete = (id) => {
    const updatedData = data.slice(0, id).concat(data.slice(id + 1));
    setData(updatedData);
  };

  const handleEdit = (id) => {
    setOpen(true);
    setEditIndex(id);
  };

  useEffect(() => {
    let newData = inventory.map((item) => ({
      ...item,
      disabled: false,
    }));
    setData(newData);
  }, [inventory]);

  const handleSubmit = React.useCallback(
    (updatedData) => {
      const newData = [...data];
      newData[editIndex] = updatedData;
      setData(newData);
      setOpen(false);
    },
    [data, editIndex]
  );

  const handleDisable = (e, id) => {
    const updatedData = data.map((item, index) => {
      if (index === id) {
        return { ...item, disabled: !item.disabled };
      }
      return item;
    });
    setData(updatedData);
  };

  return (
    <div>
      <Header as="h1" textAlign="center" inverted>
        {!isAdmin && "User View"}
      </Header>
      <Grid columns={4} stackable inverted>
        <Grid.Column>
          <Segment inverted>
            <Header icon textAlign="center">
              <Icon name="shopping cart" />
              Total Products
              <p>{totalProducts}</p>
            </Header>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment inverted>
            <Header icon textAlign="center">
              <Icon name="dollar" />
              Total Store Value
              <p>${totalValue}</p>
            </Header>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment inverted>
            <Header icon textAlign="center">
              <Icon name="close" />
              Out of Stock
              <p>{outOfStock}</p>
            </Header>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment inverted>
            <Header icon textAlign="center">
              <Icon name="cubes" />
              Categories
              <p>{categories.size}</p>
            </Header>
          </Segment>
        </Grid.Column>
      </Grid>

      <Table celled inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Value</Table.HeaderCell>
            {isAdmin && <Table.HeaderCell>Actions</Table.HeaderCell>}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((item, index) => (
            <Table.Row
              key={index}
              className={cx({
                "row-disabled": item.disabled,
              })}
              tabIndex={0}
            >
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              <Table.Cell>{item.value}</Table.Cell>

              {isAdmin && (
                <Table.Cell>
                  {
                    <Button.Group>
                      <Button
                        icon
                        onClick={() => handleEdit(index)}
                        disabled={item.disabled}
                        aria-label="Edit item"
                      >
                        <Icon name="edit" />
                      </Button>
                      <Button
                        icon
                        onClick={(e) => handleDisable(e, index)}
                        aria-label={
                          item.disabled ? "Enable item" : "Disable item"
                        }
                      >
                        <Icon name={item.disabled ? "eye slash" : "eye"} />
                      </Button>
                      <Button
                        icon
                        onClick={() => handleDelete(index)}
                        disabled={item.disabled}
                        aria-label="Delete item"
                      >
                        <Icon name="trash" />
                      </Button>
                    </Button.Group>
                  }
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <ModalForm
        open={open}
        setOpen={setOpen}
        element={data?.[editIndex]}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AdminView;

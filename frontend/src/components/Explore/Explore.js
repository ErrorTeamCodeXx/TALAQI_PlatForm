import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      s
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Home", "Profile", "LogOut"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

    </Box>
  );

  return (
    <div>
      {["Home"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

function Explore() {
  return (
    <>
      <Container style={{ display: "flex", margin: "0px" }}>
        <Container style={{ width: "30%" }}>{TemporaryDrawer()}</Container>
        <Container
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            width: "70%",
            padding: "20px",
          }}
        >
          <Container style={{ width: "35%", padding: "0px", margin: "0px" }}>
            <Row
              style={{
                display: "flex",
                flexDirection: "column",
                height: "60vw",
                flexWrap: "nowrap",
              }}
            >
              <Col>
                <Image
                  style={{ width: "100%", height: "100%", border: "none" }}
                  src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
                  thumbnail
                />
              </Col>
              <Col>
                <Image
                  style={{ width: "100%", height: "100%", border: "none" }}
                  src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
                  thumbnail
                />
              </Col>
              <Col>
                <Image
                  style={{ width: "100%", height: "100%", border: "none" }}
                  src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
                  thumbnail
                />
              </Col>
            </Row>
          </Container>
          <Container style={{ width: "35%", padding: "0px", margin: "0px" }}>
            <Row
              style={{
                display: "flex",
                flexDirection: "column",
                height: "60vw",
                flexWrap: "nowrap",
              }}
            >
              <Col>
                <Image
                  style={{ width: "100%", height: "100%", border: "none" }}
                  src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
                  thumbnail
                />
              </Col>
              <Col>
                <Image
                  style={{ width: "100%", height: "100%", border: "none" }}
                  src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
                  thumbnail
                />
              </Col>
              <Col>
                <Image
                  style={{ width: "100%", height: "100%", border: "none" }}
                  src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
                  thumbnail
                />
              </Col>
            </Row>
          </Container>
          <Container style={{ width: "40%", padding: "0px", margin: "0px" }}>
            <Row
              style={{
                display: "flex",
                flexDirection: "column",
                height: "120vw",
              }}
            >
              <Col>
                <Image
                  style={{ width: "100%", height: "100%", border: "none" }}
                  src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
                  thumbnail
                />
              </Col>
              <Col>
                <Image
                  style={{ width: "100%", height: "100%", border: "none" }}
                  src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
                  thumbnail
                />
              </Col>
              <Col>
                <Image
                  style={{ width: "100%", height: "100%", border: "none" }}
                  src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
                  thumbnail
                />
              </Col>
            </Row>
          </Container>
        </Container>
      </Container>
    </>
  );
}

export default Explore;

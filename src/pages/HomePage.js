import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  useTheme,
  Box,
  Button,
  IconButton,
} from "@mui/material";

import { Fade } from "react-awesome-reveal";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

import Navbar from "../components/NavbarV3/Navbar_Home";

import GeneralIdea from "../assets/GeneralIdea.png";
import WhatWeWant from "../assets/WhatWeWant_2.png";
import LogoText from "../assets/Logo_Text.png";

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const aboutUsRef = useRef(null);

  const scrollToAboutUs = () => {
    aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const goToContact = () => {
    navigate("/contact");
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 10, mb: 4, padding: 3 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              INTRODUCTION
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              BACTUBIG
            </Typography>
            <Typography variant="body1" gutterBottom>
              represents a pioneering effort to enhance water quality assessment
              through cutting-edge technology. Focused on developing a
              predictive model using physicochemical parameters, such as pH,
              turbidity, and temperature, integrated into a portable
              microcontroller system, BACTUBIG aims to provide communities with
              rapid and reliable evaluations of water safety. Complemented by a
              user-friendly web interface for data management and visualization,
              this research initiative seeks to empower communities by making
              water quality monitoring accessible and effective, thereby
              contributing to sustainable water resource management globally.
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={scrollToAboutUs}
            >
              Learn More
            </Button>
          </Grid>
          <Grid item xs={12} md={6} sx={{ position: "relative" }}>
            <Box
              sx={{
                width: "100%",
                height: 0,
                paddingBottom: "56.25%",
                backgroundColor: "#EFFAFF",
                position: "relative",
              }}
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/sy3WofBIZ2I"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></iframe>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ mt: 20, mb: 4, padding: 3 }}>
        <Grid
          ref={aboutUsRef}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            About Us
          </Typography>
        </Grid>
        <Fade
          cascade
          damping={0.5}
          direction="up"
          duration={500}
          delay={300}
          triggerOnce="true"
        >
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: "100%",
                  height: 0,
                  paddingBottom: "56.25%",
                  backgroundColor: "grey.300",
                }}
              >
                <img
                  src={GeneralIdea}
                  alt="General Idea"
                  style={{ width: "100%", height: "auto" }}
                ></img>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom>
                General Idea of the Project
              </Typography>
              <Typography variant="body1" gutterBottom>
                This project will develop a cost-effective and accessible
                solution for detecting pathogenic bacteria in water. It involves
                creating an ensemble learning model using physicochemical
                parameters (e.g., pH, turbidity, temperature) to predict
                bacterial presence. This model will be integrated into a
                microcontroller system with a sensory device for real-time water
                safety analysis and feedback.
              </Typography>
              <Typography variant="body1" gutterBottom>
                The system will enable communities without access to traditional
                testing to quickly and reliably assess water quality. A
                web-based application will collect and visualize water data,
                supporting immediate safety checks, long-term studies, and the
                Sustainable Development Goal (SDG) for clean water and
                sanitation.
              </Typography>
            </Grid>
          </Grid>
        </Fade>
      </Container>
      <Container maxWidth="lg" sx={{ mt: 10, mb: 4, padding: 3 }}>
        <Fade
          cascade
          damping={1}
          direction="up"
          duration={500}
          delay={300}
          triggerOnce="true"
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom>
                What Do We Want to Achieve?
              </Typography>
              <Typography variant="body1" gutterBottom>
                We aim to empower communities lacking access to traditional
                microbiological testing by providing a reliable and swift means
                of assessing water quality. This system will facilitate
                immediate and on-site evaluation, eliminating the need for
                costly and time-consuming laboratory analyses. Additionally, we
                will create a comprehensive web-based application that collects,
                organizes, and visualizes water quality data.
              </Typography>
              <Typography variant="body1" gutterBottom>
                This application will support immediate safety assessments and
                serve as a valuable resource for researchers and policymakers by
                providing a rich database for ongoing studies and the
                development of improved water management practices.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: "100%",
                  height: 0,
                  paddingBottom: "56.25%",
                  backgroundColor: "grey.300",
                }}
              >
                <img
                  src={WhatWeWant}
                  alt="WhatWeWant"
                  style={{ width: "100%", height: "auto" }}
                ></img>
              </Box>
            </Grid>
          </Grid>
        </Fade>
      </Container>
      <Container maxWidth="lg" sx={{ my: 20, padding: 3 }}>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Get in Touch
            </Typography>
            <Typography variant="body1" color="textSecondary">
              If you're interested in learning more, contributing your
              expertise, or exploring potential collaborations, we welcome you
              to get in touch.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} textAlign="center">
            <Button variant="contained" color="primary" onClick={goToContact}>
              Contact Us
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          backgroundColor: theme.palette.footer.main, // Light grey background
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} BACTUBIG. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;

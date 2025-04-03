"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { purchase, customer } from "@/utils/constructs";
import { useRouter } from "next/navigation";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step: number, address: customer, purchase: purchase, customer: customer, setAddress: React.Dispatch<React.SetStateAction<customer>>) {
  switch (step) {
    case 0:
      return <AddressForm userInfo={customer} onAddress={setAddress} />;
    case 1:
      return <PaymentForm />;  // Assuming you will use PaymentForm here
    case 2:
      return <Review address={address} purchase={purchase} customer={customer} />;
    default:
      throw new Error("Unknown step");
  }
}

interface CheckoutProps {
  onSuccess: (success: boolean) => void;
  onReturn: (done: boolean) => void;
  purchase: purchase;
  customer: customer;
}

const Checkout: React.FC<CheckoutProps> = ({ onSuccess, onReturn, purchase, customer }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [address, setAddress] = React.useState<customer>(customer);
  const router = useRouter();

  React.useEffect(() => {
    console.log(customer, "customer2");
  }, [customer]);

  const handleNext = () => {
    console.log('Next step clicked');
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      onSuccess(true);
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    console.log('Back step clicked');
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, address, purchase, customer, setAddress)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}

Checkout.displayName = "Checkout";

export default Checkout;

/* eslint-disable */
import "./App.css";
import Landing from "./Pages/Landing/Landing";
import StudentDashboard from "./Pages/StudentDashboard/StudentDashboard";
import Profile from "./Pages/Profile/Profile";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FAQ from "./Pages/FAQ/FAQ";
import ViewTest from "./Pages/ViewTest/ViewTest";
import TestSubmit from "./Pages/TestSubmit/TestSubmit";
import ReviewTest from "./Pages/ReviewTest/ReviewTest";
import MCQ from "./Pages/MCQ/MCQ";
import Payment from "./Pages/Payment/Payment";
import Feedback from "./Pages/Feedback/Feedback";
import Gateway from "./Pages/Payment/Gateway";
import Invoice from "./Pages/Payment/Invoice";
import Teachers from "./Pages/Teachers/Teachers";
import IndividualTeacher from "./Pages/Teachers/IndividualTeacher";

import LandingNew from "./Pages/NewLANDING/LandingNew";

// import PaymentHistory from "./Pages/Payment/PaymentHistory";
import PaymentConfirmation from "./Pages/PaymentConfirmation/PaymentConfirmation";

import PaymentList from "./Pages/PaymentHistory/PaymentList";

import Zoom from "./Pages/Zoom/Zoom";
import Register from "./Pages/Landing/LandingPageComponents/Register";

import MySubscription from "./Pages/MySubscription/MySubscription";
import StudentMCQ from "./Pages/StudentMCQ/StudentMCQ";
import PrivateRoute from "./Utils/PrivateRoute";

function App() {
  return (
    <>
      <Router basename="/registration">
        <Routes>
          <Route path="/" exact element={<LandingNew />} />
          <Route element={<PrivateRoute />}>
            <Route path="/page" element={<Landing />} />
            <Route path="/student-mcq" element={<StudentMCQ />} />
            <Route path="/studentProfile" element={<Profile />} />
            <Route path="/subscription" element={<Payment />} />
            <Route path="/viewTest" element={<ViewTest />} />
            <Route path="/testsubmit" element={<TestSubmit />} />
            <Route path="/paymentConfirmation" element={<PaymentConfirmation />} />
            <Route path="/studentMCQ" element={<MCQ />} />
            <Route path="/reviewTest" element={<ReviewTest />} />
          </Route>
          <Route path="/studentDashboard" element={<StudentDashboard />} />
          {/* <Route path="/mySubscriptions" element={<MySubscription />} /> */}
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/payment-gateway" element={<Gateway />} />
          <Route path="/payment-list" element={<PaymentList />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/individualteacher/:id" element={<IndividualTeacher />} />
          <Route path="/register" element={<Register />} />
          <Route path="/zoom" exact element={<Zoom />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

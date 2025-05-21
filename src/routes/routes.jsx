/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AboutUsPage from "../page/AboutUs/AboutUsPage";
import ForgetPassword from "../page/Auth/ForgetPassword/ForgetPassword";
import NewPassword from "../page/Auth/NewPassword/NewPassword";
import Otp from "../page/Auth/Otp/Otp";
import SignIn from "../page/Auth/SignIn/SignIn";
import DashboardHome from "../page/DashboardHome/DashboardHome";
import PersonalInformationPage from "../page/PersonalInformation/PersonalInformationPage";
import PrivacyPolicyPage from "../page/PrivacyPolicy/PrivacyPolicyPage";
import SettingsPage from "../page/Settings/SettingsPage";
import TermsconditionPage from "../page/TermsCondition/TermsconditionPage";
import UsersPage from "../page/Users/UsersPage";
// import AddItemPage from "../page/AddItem/AddItemPage";
import Notification from "../component/Main/Notification/Notification";
import ContributionDetails from "../page/ContributionDetails/ContributionDetails";
import EarningsPage from "../page/EarningsPage/EarningsPage";
import EditAboutUs from "../page/EditAboutUs/EditAboutUs";
import EditPersonalInformationPage from "../page/EditPersonalInformationPage/EditPersonalInformationPage";
import EditPrivacyPolicy from "../page/EditPrivacyPolicy/EditPrivacyPolicy";
import EditTermsConditions from "../page/EditTermsConditions/EditTermsConditions";
import AdminRoutes from "./AdminRoutes";

import ChangeRequestPage from "../page/ChangeRequestPage/ChangeRequestPage";

import MusicPage from "../component/Main/MusicPage/MusicPage";
import ChangeRequestDetailsPage from "../page/ChangeRequestDetailspage/ChangeRequestDetailsPage";
import ChildSaftyPolicyPage from "../page/ChildSftyPolicy/Childsaftypage";
import EditChildSaftyPolicy from "../page/EditeChildSfatyPolicy/EditeChildSaftyPolicy";
import EditSubscriptionPage from "../page/EditSubscription/EditSubscriptionPage";
import SubscriptionAddPage from "../page/SubscriptionAddPage/SubscriptionAddPage";
import SubscriptionCardPage from "../page/SubscriptionCardPage/SubscriptionCardPage";
import UserDetailsPage from "../page/UserDetails/UserDetailsPage";
import ProctedRoute from "./ProctedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AdminRoutes>
        <ProctedRoute>
          <MainLayout />
        </ProctedRoute>
      </AdminRoutes>
    ),
    errorElement: <h1>Error</h1>,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "users-details/:id",
        element: <UserDetailsPage />,
      },

      {
        path: "contribution",
        element: <ContributionDetails />,
      },
      {
        path: "Earnings",
        element: <EarningsPage />,
      },

      {
        path: "ChangeRequest",
        element: <ChangeRequestPage />,
      },
      {
        path: "music",
        element: <MusicPage />,
      },
      {
        path: "/ChangeRequest/Details/:id",
        element: <ChangeRequestDetailsPage />,
      },
      {
        path: "Subscription",
        element: <SubscriptionCardPage />,
      },
      {
        path: "Subscription/add",
        element: <SubscriptionAddPage />,
      },
      {
        path: "/Subscription/:id",
        element: <EditSubscriptionPage />,
      },

      {
        path: "personal-info",
        element: <PersonalInformationPage />,
      },
      {
        path: "edit-personal-info",
        element: <EditPersonalInformationPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "/notification",
        element: <Notification />,
      },
      {
        path: "settings/personal-info",
        element: <PersonalInformationPage />,
      },

      {
        path: "settings/edit-personal-info",
        element: <EditPersonalInformationPage />,
      },
      {
        path: "settings/privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "settings/child-safety-policy",
        element: <ChildSaftyPolicyPage />,
      },
      {
        path: "/settings/edit-child-safety-policy/:id",
        element: <EditChildSaftyPolicy />,
      },
      {
        path: "/settings/edit-privacy-policy/:id",
        element: <EditPrivacyPolicy />,
      },
      {
        path: "settings/terms-conditions",
        element: <TermsconditionPage />,
      },
      {
        path: "/settings/edit-terms-conditions/:id",
        element: <EditTermsConditions />,
      },
      {
        path: "settings/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/settings/edit-about-us/:id",
        element: <EditAboutUs />,
      },
    ],
  },
  {
    path: "/auth",
    errorElement: <h1>Auth Error</h1>,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "otp/:email",
        element: <Otp />,
      },
      {
        path: "new-password/:email",
        element: <NewPassword />,
      },
    ],
  },
]);

export default router;

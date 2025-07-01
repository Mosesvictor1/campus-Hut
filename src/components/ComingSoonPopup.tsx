// components/ComingSoonPopup.tsx

import React from "react";
import ComingSoonModal from "./ComingSoonModal";

interface Props {
  onClose: () => void;
}

const ComingSoonPopup: React.FC<Props> = ({ onClose }) => {
  return (
    <ComingSoonModal
      onClose={onClose}
      description="The CampusHut app will be available soon on Play Store & App Store. Enter your email to get notified when we launch!"
    />
  );
};

export default ComingSoonPopup;

import React from "react";
import ComingSoonModal from "./ComingSoonModal";

interface Props {
  onClose?: () => void;
}

const ComingSoonBanner: React.FC<Props> = ({ onClose }) => {
  return (
    <ComingSoonModal
      onClose={onClose || (() => {})}
      title="🚀 Launching Soon!"
      description="CampusHut is almost here! Get ready to experience the future of campus life."
    />
  );
};

export default ComingSoonBanner;

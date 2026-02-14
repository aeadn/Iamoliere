import { useState } from "react";
import { ChatHome } from "./components/ChatHome";
import { ChatWithMessages } from "./components/ChatWithMessages";
import { Profile } from "./components/Profile";
import { Explorer } from "./components/Explorer";
import { TextDetail } from "./components/TextDetail";

type Page =
  | "chat"
  | "chat-messages"
  | "profile"
  | "explorer"
  | "text-detail";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("chat");

  const profileImage =
    "https://images.unsplash.com/photo-1680356475155-3ca8fa2192aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRob3IlMjB3cml0ZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2NTk1MDN8MA&ixlib=rb-4.1.0&q=80&w=1080";

  const renderPage = () => {
    switch (currentPage) {
      case "chat":
        return (
          <ChatHome
            onNavigate={setCurrentPage}
            profileImage={profileImage}
          />
        );
      case "chat-messages":
        return (
          <ChatWithMessages
            onNavigate={setCurrentPage}
            profileImage={profileImage}
          />
        );
      case "profile":
        return (
          <Profile
            onNavigate={setCurrentPage}
            profileImage={profileImage}
          />
        );
      case "explorer":
        return (
          <Explorer
            onNavigate={setCurrentPage}
            profileImage={profileImage}
          />
        );
      case "text-detail":
        return (
          <TextDetail
            onNavigate={setCurrentPage}
            profileImage={profileImage}
          />
        );
      default:
        return (
          <ChatHome
            onNavigate={setCurrentPage}
            profileImage={profileImage}
          />
        );
    }
  };

  return <div className="size-full">{renderPage()}</div>;
}
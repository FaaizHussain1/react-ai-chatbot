import ChatWidget from "./components/chatbot/chat-widget";
import { ThemeProvider } from "./components/chatbot/theme-provider";
import "./index.css";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="scitech-theme">
      <ChatWidget />
    </ThemeProvider>
  );
}

export default App;

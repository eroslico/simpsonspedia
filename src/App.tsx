import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EasterEgg } from "@/components/EasterEgg";
import { CouchGag } from "@/components/CouchGag";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { KeyboardShortcuts, ShortcutHint } from "@/components/KeyboardShortcuts";
import { NotificationProvider } from "@/components/Notifications";
import { HomerChat } from "@/components/HomerChat";
import { VoiceCommands, VoiceCommandsHelp } from "@/components/VoiceCommands";
import { NavigationGestures } from "@/components/GestureHandler";
import { SoundProvider, SoundToggle } from "@/components/SoundSystem";
import Index from "./pages/Index";
import Characters from "./pages/Characters";
import Episodes from "./pages/Episodes";
import Locations from "./pages/Locations";
import Favorites from "./pages/Favorites";
import Stats from "./pages/Stats";
import Compare from "./pages/Compare";
import Profile from "./pages/Profile";
import Predictions from "./pages/Predictions";
import DailyChallenge from "./pages/DailyChallenge";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SoundProvider>
          <NotificationProvider>
            <EasterEgg>
              <Toaster />
              <Sonner />
            <BrowserRouter>
              <KeyboardShortcuts />
              <ShortcutHint />
              <NavigationGestures />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/characters" element={<Characters />} />
                <Route path="/episodes" element={<Episodes />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/predictions" element={<Predictions />} />
                <Route path="/daily" element={<DailyChallenge />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <HomerChat />
              <VoiceCommands />
              <VoiceCommandsHelp />
            </BrowserRouter>
              <CouchGag />
              <OfflineIndicator />
              {/* Sound toggle button */}
              <div className="fixed bottom-4 left-4 z-50">
                <SoundToggle />
              </div>
            </EasterEgg>
          </NotificationProvider>
        </SoundProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

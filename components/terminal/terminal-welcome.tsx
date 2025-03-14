"use client";

import { useContext } from "react";
import { TerminalContext } from "@/contexts/terminal-context";

export default function TerminalWelcome() {
  const { theme } = useContext(TerminalContext);

  return (
    <div className="mb-4 text-terminal-text-dim">
      <pre className={theme.textGreenClass}>
        {`
 ,-----. ,--. ,--. ,---.   ,---.   ,---.  ,--.   ,--.  ,---.   ,--.   ,--.  ,---.  ,--.  ,--.,--. 
'  .-.  '|  | |  |'   .-' '   .-' /  O  \\ |   \`.'   | /  O  \\  |   \`.'   | /  O  \\ |  '--'  ||  | 
|  | |  ||  | |  |'.  \`-. \`.  \`-.|  .-.  ||  |'.'|  ||  .-.  | |  |'.'|  ||  .-.  ||  .--.  ||  | 
'  '-'  ''  '-'  '.-'    |.-'    |  | |  ||  |   |  ||  | |  | |  |   |  ||  | |  ||  |  |  ||  | 
 \`-----'  \`-----' \`-----' \`-----'\`--' \`--'\`--'   \`--'\`--' \`--' \`--'   \`--'\`--' \`--'\`--'  \`--'\`--' 
`}
      </pre>
      <p className="mb-2">
        Welcome to my interactive developer portfolio terminal.
      </p>
      <p>
        Type <span className={theme.textYellowClass}>help</span> to see
        available commands or navigate using the tabs above. Try{" "}
        <span className={theme.textGreenClass}>launch_portfolio</span> for a
        special experience!
      </p>
    </div>
  );
}

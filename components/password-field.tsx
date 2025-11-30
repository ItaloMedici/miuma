import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

export function PasswordField(props: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <InputGroup>
      <InputGroupInput {...props} type={showPassword ? "text" : "password"} />
      <InputGroupAddon align="inline-end">
        <Button
          onClick={() => setShowPassword(!showPassword)}
          size="icon"
          type="button"
          variant="ghost"
          className="bg-none hover:bg-transparent focus:bg-none foucus:outline-none"
        >
          {showPassword ? (
            <EyeClosed className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}

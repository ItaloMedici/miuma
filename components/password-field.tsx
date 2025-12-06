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
          className="foucus:outline-none bg-none hover:bg-transparent focus:bg-none"
        >
          {showPassword ? (
            <EyeClosed className="text-muted-foreground h-4 w-4" />
          ) : (
            <Eye className="text-muted-foreground h-4 w-4" />
          )}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}

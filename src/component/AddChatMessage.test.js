import { render,screen } from "@testing-library/react";
import AddChatMessage from "./AddChatMessage";

describe("AddChatMessage", () => {

    it("handles prompt message correctly", () => {
        const chatMessages = [
          { message: "I am a prompt.", promptOrResponseOrError: "prompt" },
        ];
    
        const AddChatMessageComponent = AddChatMessage({chatMessages});
    
        render(AddChatMessageComponent);
    
        const element = screen.getByRole("textbox");
        expect(element).toBeInTheDocument();
    });

    it("handles response message correctly", () => {
        const chatMessages = [
          { message: "I am a response.", promptOrResponseOrError: "response" },
        ];
    
        const AddChatMessageComponent = AddChatMessage({chatMessages});
    
        render(AddChatMessageComponent);
    
        const element = screen.getByRole("textbox");
        expect(element).toBeInTheDocument();
    });

    
    it("handles error message correctly", () => {
        const chatMessages = [
          { message: "I am an error.", promptOrResponseOrError: "error" },
        ];
    
        const AddChatMessageComponent = AddChatMessage({chatMessages});
    
        render(AddChatMessageComponent);
    
        const element = screen.getByRole("heading");
        expect(element).toBeInTheDocument();
    });
});
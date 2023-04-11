import ChatGPTApp from "./App";
import { render,screen } from "@testing-library/react";


describe("App", () => {

    it("main-div did mount", () => {

        render(<ChatGPTApp />);

        const element = screen.getByTestId('main-div');
        expect(element).toBeInTheDocument();
    });

})
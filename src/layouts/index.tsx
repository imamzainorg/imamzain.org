import React, { ReactNode } from "react"
import Header from "./header"
import Footer from "./footer"
 

type ContainerProps = {
  children: ReactNode;
};

const Layouts: React.FC<ContainerProps> = ({ children }) => {
	return (
        <>
            <Header />
            {children}
             <Footer />
        </>
        )
}

export default Layouts

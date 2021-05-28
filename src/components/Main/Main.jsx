import Pizza1 from '../../images/pizza1.jpg';
import Pizza2 from '../../images/pizza2.jpg';
import Pizza3 from '../../images/pizza3.jpg';
import './Main.css';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBCarouselElement, } from "mdb-react-ui-kit";
const Main = () =>{
    return (
        <>
            <div className="main-pizza-view">
                <MDBCarousel showIndicators showControls>
                    <MDBCarouselInner>
                        <MDBCarouselItem itemId={0}>
                        <MDBCarouselElement src={Pizza1} alt='...' />
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId={1}>
                        <MDBCarouselElement src={Pizza2} alt='...' />
                        </MDBCarouselItem>
                        <MDBCarouselItem itemId={2}>
                        <MDBCarouselElement src={Pizza3} alt='...' />
                        </MDBCarouselItem>
                    </MDBCarouselInner>
                </MDBCarousel>
            </div>
            
        </>
    )
}

export default Main;
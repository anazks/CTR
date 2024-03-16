import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import './HomeCards.css';
import Axios from '../Static/Axios';
import { UserContext } from '../Static/UserContext';
import { ImgUrl } from '../Static/ImagUrl';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function HomeCards() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [product, setProduct] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        try {
            const interval = setInterval(() => {
                if(setShow){
                    handleClose()
                }
                handleShow();
            }, 10000);
            Axios.get('/Admin/allproducts').then((response) => {
                console.log(response);
                setProduct(response.data);

            });
        } catch (error) {
            console.error(error);
        }
    }, []);

    
    const addtoCart = (obj) => {
        console.log(obj);
        console.log(user.user._id, "user");
        const userId = user.user._id;
        const data = {
            obj,
            userId,
        };
        try {
            Axios.post('/AddToCart', data).then((response) => {
                console.log(response.data);
                navigate('/cart');
            });
        } catch (error) {
            console.error(error);
        }
    };

    const clickData = (addId, Name) => {
        try {
            console.log(addId, Name, "gotcha--");
            console.log(user, "userdata");

            let Email = "anonymous";
            let UserName = "anonymous";

            if (user && user.user) {
                Email = user.user.Email;
                UserName = user.user.UserName;
            }

            const Data = {
                addId,
                UserName,
                Email,
            };

            console.log(Data);

            Axios.post('/addCTR', Data)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='homecardheading'>
                <h1>Our Products</h1>
            </div>
            <div className='homeCards'>
               
                <div className='homepageCards'>
                    {product.map((obj) => (
                        <div className='homeCard' key={obj.id}>
                            <div className='homeCardimage'>
                                <img src={`${ImgUrl}/${obj.name}.jpg`} alt="" onClick={() => clickData(obj.id, obj.name)} />
                            </div>
                            <div className='homeCarddetails'>
                                <div className='pname'>
                                    <p><b>{obj.name}</b></p>
                                </div>
                                <div className='productDetails'>
                                    <p>Rating</p>
                                    <span><p><s>{obj.price}</s></p></span>
                                    <p className='offer'>{obj.offer_price}</p>
                                </div>
                                <div className='homecard_btn'>
                                    <button type="submit" onClick={() => addtoCart(obj)}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='homeproductmore'>
                <button>See More</button>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                  
                </Modal.Header>
        
                    <button className='View'>View</button>
                    {product && product.length > 0 &&
                        <img src={`${ImgUrl}/${product[0].name}.jpg`} alt="" onClick={() => clickData(product[0].id, product[0].name)} />
                    }
               
            </Modal>
        </>
    );
}

export default HomeCards;

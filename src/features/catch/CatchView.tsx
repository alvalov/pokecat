import React, { useState }  from "react";
import { Pokecat } from "../../app/store";
import { Modal, Button } from "react-bootstrap";
import Card from "../styled-components/card";
import CatImage from "../styled-components/catImage";
import StyledButton from "../styled-components/button"
import Input from "../styled-components/input"
import Spinner from "../../common/Spinner";
import { CatStatsBar } from "../../common/progressBars";
import _ from "lodash";

type CatchProps = {
    images: string[],
    imagesLoading: boolean,
    imagesError: boolean,
    canCatch: boolean,
    pushCat: (cat: Pokecat) => void 
}

const imageResize={
    width: "275px",
    height: "275px",
    overflow: "hidden",
    paddingTop: "20px"
}

export const CatchView = (props: CatchProps) =>{
    const [show, setShow] = useState(false);
    const [catName, setCatName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [attack, setAttack] = useState(0);
    const [defense, setDefense] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [catCaught, setCatCaught] = useState(false);

    const chooseCat = (url: string, name: string, attack: number, defense: number, speed: number) => {
        props.pushCat({url, name, attack, defense, speed});
        setAttack(attack);
        setDefense(defense);
        setSpeed(speed);
        setCatCaught(true);
    }  

    const getRandomStat=()=>{
        return _.random(1,30)
    }
    
    function catchModal(imageUrl){
        setShow(true);
        setImgUrl(imageUrl)
    }

    return <div className="container mt-5 ">
    <div className="text-white text-center">
        <h3 className="font-weight-bold">Catch your daily Pokécat!</h3>
        {props.canCatch ? "You can still catch a Pokécat today!" : "Sorry, you've already caught a cat today! Please come back tomorrow!"}
    </div>
    <div className=" d-flex">
        <div className="card-body text-center">
            <div className="row container" hidden={!props.canCatch}>
                {props.imagesLoading ? <div className="justify-content-center mt-3"><Spinner /></div> 
                : props.imagesError ? "Failed to load images" 
                : _.map(props.images, (imageUrl, idx) => 
                    <div className="col-sm-4 item-center" key={idx}>
                        <img src={imageUrl} object-fit="contain" style={imageResize} 
                        className="img-fluid rounded mx-auto d-block"/>
                        
                        <StyledButton className="mt-3" onClick={()=>{catchModal(imageUrl)}}>
                            Catch!
                        </StyledButton>
                    </div>
                )}
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>You got....</Modal.Title>
                        </Modal.Header>
                    <Modal.Body>
                        <Card className="col-sm-3">
                            <CatImage height={200} src={imgUrl} className="card-image img-fluid rounded p-2" />
                            <div className="text-center">
                                {catCaught ? <h3>{catName}</h3> : 
                                <label>
                                    Name your pokécat:
                                    <Input className="form-control mt-2" value={catName} onChange={(e)=>setCatName(e.target.value)} />
                                </label>}
                            </div>   
                            <div hidden={!catCaught}>
                                <div className="p-2">
                                    <span>Attack</span>
                                    <CatStatsBar now={attack} />
                                </div>
                                <div className="p-2">
                                    <span>Defense</span>
                                    <CatStatsBar now={defense} />
                                </div>
                                <div className="p-2">
                                    <span>Speed</span>
                                    <CatStatsBar now={speed} />
                                </div>
                            </div>
                        </Card>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary mr-3" onClick={() => setShow(false)}>
                            Close
                        </Button>
                        <Button hidden={catCaught} disabled={!(catName.length > 0)} onClick={()=>chooseCat(imgUrl, catName, getRandomStat(), getRandomStat(), getRandomStat())}>
                            Catch!
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>                
    </div>
</div>
}
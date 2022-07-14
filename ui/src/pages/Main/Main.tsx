import React from 'react';
import classes from "./Main.module.css";
import MainCarousel from "../../components/MainCarousel/MainCarousel";


function Main() {
    //TODO create footer

    return (
       <>
        <div className="align-items-center flex-column d-flex">
        <div className={classes.carouselWrap}>
            <MainCarousel slides={
                [   {img:'https://nicedayz.net/ru/16212/images/image-by-item-and-alias?item=Post398&dirtyAlias=8d4f80c625-11_900x.jpg',interval:10000,title:"first"},
                    {img:'https://nicedayz.net/ru/16212/images/image-by-item-and-alias?item=Post398&dirtyAlias=8d4f80c625-11_900x.jpg',interval:10000,title:'sescond'},
                    {img:'https://nicedayz.net/ru/16212/images/image-by-item-and-alias?item=Post398&dirtyAlias=8d4f80c625-11_900x.jpg',interval:10000},
                ]

            }/>
        </div>
            <div className={classes.aboutUs}>
                <h1>About us</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam aspernatur debitis eaque esse incidunt iusto magni minima possimus quibusdam quidem quo reiciendis repellendus sapiente, tempora veritatis vero voluptas voluptatum? Facilis, minima, tempore! Accusamus ad amet beatae commodi cum dignissimos doloribus ea eius eligendi, eos est eveniet ex ipsa minima natus necessitatibus nihil non optio quam quidem quis sint velit. Aspernatur cum ducimus eos expedita laboriosam maxime, tempore! Amet distinctio sapiente similique. Blanditiis culpa modi natus nesciunt nulla odit saepe suscipit. Aliquid deleniti distinctio dolor eum fugit quasi, sequi voluptates. Beatae consectetur doloremque dolores earum enim eum eveniet ex excepturi hic impedit, magnam maiores maxime omnis provident quibusdam quos tempore vitae. Distinctio, ducimus minus quisquam rem saepe sunt ullam velit! Impedit magni quisquam veritatis. Consequuntur, cupiditate dolores ducimus facere harum iure molestias nam quae reiciendis vitae! Accusantium delectus dolor dolorum eligendi enim, fugit libero officia officiis qui sunt, vel voluptates.</p>
            </div>
        </div>
       </>
    );
}

export default Main;
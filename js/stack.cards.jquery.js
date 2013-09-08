// Stack cards jQuery Plugin by Fabien Beaufreton (fabien@olorin.fr)

(function($)
{
    //definition du plugin
    $.fn.stackCards=function(options)
    {
        //options par defaut
        var options_default ={
            mode: "extensive",
            enableOpacity: true,
            enableRotation: true,
            width: 300,
            height: 300,
            clickCard: function(){console.log("click card default function");},
            hoverCard: function(){console.log("default hover card");}
        };

        var opacity = 0.90;
        var zindex = 100;
        var $cards;
        var positionW;
        var positionH;

        //override des options par defaut avec les options en entrees
        var o = $.extend(options_default, options);

        //fonction de lancement
        var initStack = function()
        {
            setStack(1); //first call

            $cards.click(function()
            {
                var active;

                if($(this).hasClass('active'))
                {
                    active = true;
                }
                else
                {
                    active = false;
                    if(o.enableOpacity)
                        opacity = 0.90;
                    zindex = 90;

                    setStack(0); //refresh

                    //cards clicked become first card
                    $(this).animate({
                        "opacity" : 1,
                        "z-index": 100
                    }, 50)
                    .removeClass("style")
                    .addClass("active");
                }

                o.clickCard.call(this, $(this), active); //appel de la function clickCard depuis l'objet o
                
            })
            .mouseover(function(){
                o.hoverCard.call(this, $(this)); //appel de la function hoverCard depuis l'objet o
            });

        };

        var initCards = function(index, $m_card, m_zindex, m_opacity)
        {
            // console.log(index);
            // console.log($m_card);
            // console.log($m_card.width());

            var pos_x = 0;
            var pos_y = 0;
            var card_width = $m_card.width();
            var card_height = $m_card.height();


            if(o.mode == "extensive" && index % 3 === 0) //north
            {
                // console.log(index);
                // console.log("extensive");
                // $m_card.remove();
                pos_x = Math.floor(Math.random() * o.width);
                pos_y = Math.floor(Math.random() * o.height / 2) + o.height / 2;
            }
            else if(o.mode == "extensive" &&  index % 2 === 0) //south
            {
                // console.log(index);
                // $m_card.remove();
                console.log($m_card.attr("class"));
                // console.log("extensive");
                pos_x = Math.floor(Math.random() * o.width / 2);
                pos_y = Math.floor(Math.random() * o.height / 2);

                // console.log("pos_x = "+ pos_x + "; pos_y = "+ pos_y);
            }
            else //random
            {
                // console.log(index);
                // $m_card.remove();
                // console.log("random");
                pos_x = Math.floor(Math.random() * o.width) - o.width / 10;
                pos_y = Math.floor(Math.random() * o.height) - o.height / 10;
            }
            
            // //overflow right & bottom
            if(card_width < o.width)
                pos_x -= card_width;

            if(card_height < o.height)
                pos_y -= card_height;

            // console.log("pos_x = "+ pos_x + "; pos_y = "+ pos_y);

            //overflow left & top
            if(pos_x < 0)
                pos_x = Math.floor(Math.random() * o.width / 1.5);

            if(pos_y < 0)
                pos_y = Math.floor(Math.random() * o.height / 1.5);

            // console.log("pos_x = "+ pos_x + "; pos_y = "+ pos_y);

            var rotate = "";
            if(o.enableOpacity === false)
                opacity = 1;

            // $m_card.css({
            //     "left" : positionW[Math.floor(Math.random() * positionW.length)],
            //     "top" : positionH[Math.floor(Math.random() * positionH.length)],
            //     "opacity" : opacity,
            //     "z-index": zindex
            // });

            $m_card.css({
                "left" : pos_x,
                "top" : pos_y,
                "opacity" : opacity,
                "z-index": zindex
            });
                    
            var id_style = Math.floor(Math.random() * 3);

            if(o.enableRotation)
                rotate = "rotate"+Math.floor(Math.random() * 6);

            $m_card.addClass("card style style-" + id_style + " "+ rotate);
        };

        /**
         * set all cards with class or style
         * @param {[bool]} init 1:first call, 0: refresh
         */
        var setStack = function(init)
        {
            $cards.each(function(i)
            {
                //first call
                if(init == 1)
                    initCards(i+1, $(this), zindex, opacity); //index +1 because we use % to find area (0 always true with %...)
                else //refresh
                {
                    $(this).css({
                        "opacity" : opacity,
                        "z-index": zindex
                    })
                    .addClass("style")
                    .removeClass("active");
                }

                if(o.enableOpacity && opacity > 0.5)
                    opacity -= 0.05;

                zindex -= 5;
            });
        };

        return this.each(function()
        {
            $(this).css({
                width: o.width,
                height: o.height
            });
            $cards = $(this).children('div');

            positionW = getPositionValue(o.width);
            positionH = getPositionValue(o.height);

            initStack();
        });
    };

    getPositionValue = function(limit)
    {
        var out = [];

        for(var i=25; i < limit; i=i+50)
        {
            out.push(i);
        }

        console.log(out);

        return out;
    };

})(jQuery);
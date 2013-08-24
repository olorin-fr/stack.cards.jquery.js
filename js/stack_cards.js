// Stack cards jQuery Plugin by Fabien Beaufreton (fabien@olorin.fr)

(function($)
{
    //definition du plugin
    $.fn.stackCards=function(options)
    {
        //options par defaut
        var options_default ={
            enableOpacity: true,
            enableRotation: true,
            width: 300,
            height: 300,
            clickCard: function(){console.log("clcik card default function");}
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

                o.clickCard.call(this, this, active); //appel de la function clickCard depuis l'objet o
            });
        };

        var initCards = function($m_card, m_zindex, m_opacity)
        {
            var rotate = "";
            if(o.enableOpacity === false)
                opacity = 1;

            $m_card.css({
                "left" : positionW[Math.floor(Math.random() * positionW.length)],
                "top" : positionH[Math.floor(Math.random() * positionH.length)],
                "opacity" : opacity,
                "z-index": zindex
            });
                    
            var id_style = Math.floor(Math.random() * 3);

            if(o.enableRotation)
                rotate = "rotate"+Math.floor(Math.random() * 3);

            $m_card.addClass("card style style-" + id_style + " "+ rotate);
        };

        /**
         * set all cards with class or style
         * @param {[bool]} init 1:first call, 0: refresh
         */
        var setStack = function(init)
        {
            $cards.each(function()
            {
                //first call
                if(init == 1)
                    initCards($(this), zindex, opacity);
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
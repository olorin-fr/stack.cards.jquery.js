//

(function($)
{
    //definition du plugin
    $.fn.stackCards=function(options)
    {
        //options par defaut
        var options_default ={};

        var position = [25, 50, 75, 100, 150, 175, 200, 250, 275, 300, 350, 375, 400, 425, 450, 475];
        var opacity = 0.90;
        var zindex = 100;
        var $cards;

        //override des options par defaut avec les options en entrees
        var o = $.extend(options_default, options);

        //fonction de lancement
        var initStack = function()
        {
            setStack(1); //first call

            $cards.click(function()
            {
                opacity = 0.90;
                zindex = 90;

                setStack(0); //refresh

                //cards clicked become first card
                $(this).animate({
                    "opacity" : 1,
                    "z-index": 100
                }, 50)
                .removeClass("style");
            });
        };

        var initCards = function($m_card, m_zindex, m_opacity)
        {
            $m_card.css({
                        "left" : position[Math.floor(Math.random() * position.length)],
                        "top" : position[Math.floor(Math.random() * position.length)],
                        "opacity" : opacity,
                        "z-index": zindex
            });
                    
            var id_style = Math.floor(Math.random() * 3);
                    
            $m_card.addClass("card style style-" + id_style);
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
                    .addClass("style");
                }

                if(opacity > 0.5)
                    opacity -= 0.05;

                zindex -= 5;
            });
        };

        return this.each(function()
        {
            $cards = $(this).children('div');

            initStack();
        });
    };
})(jQuery);
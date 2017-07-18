jQuery(document).ready(function($){
  
  var AsiController = (function(){
    
    var $images = $('.asi-img');

    function init(options) {
      // we get the options
      var icon_style = options.icon_style;
      var icon_position = options.icon_position;
      
      renameAudioTags();
      addIcons(icon_style);
      placeIcons(icon_position);
    }
    
    /*
    / Rename asi-audio tags into audio ones.
    / Param: none
    */
    function renameAudioTags() {
      $('asi-audio').each(function() {
        var asi_id = $(this).attr('asi-id');
        $(this).replaceWith('<audio asi-id="'+asi_id+'">' + $(this).html() +'</audio>')
      });
    }
    
    /*
    / Add the icons
    / Param: icon_style ( default )
    */
    function addIcons(icon_style, icon_position) {
      
      // Icon style
      switch(icon_style) {
        default:
          var icon_minus = '<i class="ionicons ion-ios-volume-low asi-player-icon asi-minus-icon"></i>';
          var icon_plus = '<i class="ionicons ion-ios-volume-high asi-player-icon asi-plus-icon"></i>';
          break;
          
        case 'super_cool':
          // here, put the icons super_cool
          break;
      } 
      $images.each(function(index, image) {
        var asi_id = $(this).attr('asi-id');
        $(icon_minus).insertAfter($(this)).attr('asi-id', asi_id);
        $(icon_plus).insertAfter($(this)).attr('asi-id', asi_id);
      });
    }
    
    /*
    / Place the icons
    / Param: icon_position ( top-left, top-right, bottom-left, bottom-right )
    */
    function placeIcons(icon_position) {
      // Icon position
      var $icons = $('.asi-player-icon');
      $icons.each(function(index, icon) {
        var asi_id = $(this).attr('asi-id');
        var $linked_image = $('.asi-img[asi-id='+asi_id+']');
        
        var img_top = $linked_image.position().top;
        var img_left = $linked_image.position().left;
        var img_right = img_left + $linked_image.outerWidth();
        var img_bottom = $linked_image.outerHeight();
        
        var padding = 10;
        var icon_size = $(this).outerWidth();
        
        var icon_top = img_top + padding;
        var icon_bottom = $linked_image.height() - padding - icon_size;
        var icon_left = img_left + padding;
        var icon_right = img_right + padding;
        
        switch(icon_position) {
          default:
            $(this).css({marginTop: icon_top, marginLeft: icon_left});
            break;
            
          case 'top-left':
            $(this).css({top: icon_top, left: icon_left});
            break;

          case 'top-right':
            $(this).css({top: icon_top, right: icon_right});
            break;

          case 'bottom-left':
            $(this).css({marginTop: icon_bottom, left: icon_left});
            break;

          case 'bottom-right':
            $(this).css({marginTop: icon_bottom, right: icon_right});
            break;
        }            
      });
    }
    
    /*
    / Play or pause a sound
    / Param: asi_id ( integer )
    */
    function toggleAudio(asi_id) {
      var $icon_minus = $('.asi-minus-icon[asi-id='+asi_id+']');
      var $icon_plus = $('.asi-plus-icon[asi-id='+asi_id+']');
      var $audio = $('audio[asi-id='+asi_id+']');
      
      if(!$audio.hasClass('playing')) {
        $('audio').trigger('pause').removeClass('playing');
        $('.asi-plus-icon').hide();
        $('.asi-minus-icon').show().css('display', 'inline');
        
        $audio.trigger("play");
        $icon_minus.hide();
        $icon_plus.show().css('display', 'inline');
        $audio.addClass('playing');
      } else {
        $audio.trigger("pause");
        $icon_minus.show().css('display', 'inline');
        $icon_plus.hide();
        $audio.removeClass('playing');
      }
    }
    
    return {
      init: init,
      toggleAudio: toggleAudio,
      placeIcons: placeIcons
    };
  })();
  
  var options = {
    icon_style: 'basic',
    icon_position: 'top-left'
  };
  
  $('body').imagesLoaded( function() {
    AsiController.init(options);
    
    $(document).on('click', '.asi-player-icon', function(e) {
      e.preventDefault();
      var asi_id = $(this).attr('asi-id');
      AsiController.toggleAudio(asi_id);
    });
    
    $('audio').on("ended", function(){
      $(this).currentTime = 0;
      var asi_id = $(this).attr('asi-id');
      AsiController.toggleAudio(asi_id);
    });
    
    $(window).on('resize', function() {
      AsiController.placeIcons(options.icon_position);
    });
  });
});
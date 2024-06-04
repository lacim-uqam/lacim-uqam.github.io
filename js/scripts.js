(function ($, Modernizr, google, window, document) {
    $(function () {

        var isPhone  = Modernizr.mq('only all and (max-width: 40em)');
        var isTablet = Modernizr.mq('only all and (max-width: 55em)');

        /**
         * Styles the Program page list
         * Requires `==` to be present to split the
         */
        var styleProgramAndParticipantsPagesLists = function () {
            var $page = $('.fancy-list-page');

            if (!$page.length) {
                return;
            }

            $page.find('li').each(function (item) {
                $(this).html(function (index, text) {
                    var timeDividerPosition = text.indexOf('==');

                    if (timeDividerPosition <= 0) {
                        return text;
                    }

                    var timeItemArr = text.replace(/\s*==\s*/, '==').split('==');

                    var output = '<strong class="fancy-list-time">';
                    output += timeItemArr[0];
                    output += '</strong> <span class="fancy-list-item">';
                    output += timeItemArr[1];
                    output += timeItemArr[2] || '';
                    output += '</span>';

                    return output;
                });
            });
        }();

        /**
         * Make all links in the content area open in a new window
         * Local links open in the same window
         */
        var makeAllLinksInContentOpenInNewWindow = function () {
            // All external links open in a new window and local links open in the same window
            $('.content-sidebar-wrapper a').each(function (index, link) {
                $(link).attr('target', function (i, targetValue) {
                    var re = new RegExp('/' + location.host + '/');
                    return re.test(link.href) ? '' : '_blank';
                });
            });

            // All links open in a new window
            // $('.content-sidebar-wrapper a').attr('target', '_blank');
        }();

        /**
         * Appends the current page to the language link for convenience
         * Maps English and French pages
         */
        var appendCurrentPageToLanguageLink = function () {
            var pageMap = {
                activities:   'activities',
                contact:      'contact',
                index:        'index',
                publications: 'publications',

                // unique
                en : {
                    about:       'apropos',
                    internships: 'stages',
                    members:     'membres',
                    seminar:     'seminaire',
                },

                fr : {
                    apropos:   'about',
                    membres:   'members',
                    seminaire: 'seminar',
                    stages:    'internships',
                }
            };

            var currentLanguage = location.pathname.indexOf('/fr/') >= 0 ? 'fr' : 'en';
            var currentPage = location.pathname.split('/').slice(-1)[0].split('.html')[0] || 'index';
            var desiredPage = pageMap[currentPage] ? pageMap[currentPage] : pageMap[currentLanguage][currentPage];

            $('.language-link').attr('href', function (index, value) {
                return value + '/' + desiredPage + '.html'
            });
        }();


        /**
         * When clicking the language toggle, this value gets set as the preferred language
         */
        var setPreferredLanguage = function () {
            $('.language-link').click(function (evt) {
                var langKey = $(this).attr('data-lang-key');
                localStorage.setItem('languagePreference', langKey);
            });
        }();


        /**
         * Registration form
         */
        var loadRegistrationForm = function () {
            // Focus first name field
            $('#first_name').focus();

            // Removes spam check field
            $('#bot-check').remove();
        }();


        /**
         * Form submission
         */
        var submitForm = function () {
            var form = $('#registration-form');
            var submitButton = form.find('input[type="submit"]');

            form.on('submit', function (evt) {
                var formValues = $(this).serialize();
                submitButton.attr('disabled', 'disabled');

                $.ajax({
                    type: 'POST',
                    url: '../registration.php',
                    data: formValues,
                    success: function (data) {
                        window.alert(window._ismStrings.registrationSuccess);
                        submitButton.removeAttr('disabled');
                    },
                    error: function (err) {
                        window.alert(window._ismStrings.registrationError);
                        submitButton.removeAttr('disabled');
                    }
                });

                evt.preventDefault();
            });
        }();


        /**
         * Initializes the map using the Google Maps API
         */
        var initializeMap = function () {
            var $mapElement = $('#map');

            if (!$mapElement.length) {
                return;
            }

            var latitude    = $mapElement.attr('lat');
            var longitude   = $mapElement.attr('long');
            var venueName   = $mapElement.attr('venue-name');
            var isDraggable = !isPhone && !isTablet;
            var latLong     = new google.maps.LatLng(latitude, longitude);

            var mapOptions = {
                draggable: isDraggable,
                scrollwheel: false,
                zoom: 16,
                center: latLong,
                mapTypeControlOptions: { mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style'] }
            };

            var map    = new google.maps.Map($mapElement[0], mapOptions);
            var marker = new google.maps.Marker({ position: latLong, map: map, title: venueName });

            google.maps.event.addListener(marker, 'click', function (){
                var mapBubble = new google.maps.InfoWindow({ content: venueName });
                mapBubble.open(map, this);
            });
        };

        $(window).load(initializeMap);
    });
})(window.jQuery, window.Modernizr, window.google, window, document);

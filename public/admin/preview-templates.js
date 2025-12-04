var SiteContentPreview = createClass({
    render: function () {
        var entry = this.props.entry;
        var hero = entry.getIn(['data', 'hero']);
        var services = entry.getIn(['data', 'services']);

        // Helper to get image URL
        function getAssetUrl(path) {
            if (!path) return '';
            return path.toString();
        }

        return h('div', {},
            // Hero Section Preview
            h('section', { className: 'hero' },
                h('div', { className: 'hero-container' },
                    h('div', { className: 'hero-content' },
                        h('h1', { className: 'hero-title' }, hero ? hero.get('title') : 'Título'),
                        h('p', { className: 'hero-subtitle' }, hero ? hero.get('subtitle') : 'Subtítulo'),
                        h('div', { className: 'hero-actions' },
                            h('button', { className: 'btn btn-primary' }, 'Cotizar Ahora'),
                            h('button', { className: 'btn btn-accent' }, hero ? hero.get('buttonText') : 'Ver Servicios')
                        )
                    ),
                    h('div', { className: 'hero-image' },
                        h('img', { src: '/assets/truck.png', alt: 'Camión' })
                    )
                )
            ),

            // Services Section Preview
            h('section', { className: 'services-section' },
                h('div', { className: 'container' },
                    h('h2', { className: 'section-title' }, services ? services.get('title') : 'Nuestros Servicios'),
                    h('p', { className: 'section-subtitle' }, services ? services.get('subtitle') : 'Descripción'),

                    // Fleet Section
                    h('div', { className: 'fleet-section' },
                        h('h3', { className: 'fleet-title' }, services ? services.get('fleetTitle') : 'Nuestra Flota'),
                        h('div', { className: 'fleet-image-container' },
                            h('img', { className: 'fleet-image', src: '/assets/trucks-fleet.jpg' })
                        )
                    ),

                    // Services Grid
                    h('div', { className: 'services-grid' },
                        services && services.get('items') ? services.get('items').map(function (item, index) {
                            return h('div', { className: 'service-card', key: index },
                                h('div', { className: 'service-image' },
                                    h('img', { src: getAssetUrl(item.get('image')) })
                                ),
                                h('div', { className: 'service-content' },
                                    h('h3', {}, item.get('title')),
                                    h('p', {}, item.get('description'))
                                )
                            );
                        }) : null
                    )
                )
            )
        );
    }
});

CMS.registerPreviewTemplate('site_content', SiteContentPreview);
CMS.registerPreviewStyle('/admin/admin-styles.css');

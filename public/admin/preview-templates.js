var SiteContentPreview = createClass({
    render: function () {
        var entry = this.props.entry;
        var data = entry.getIn(['data']).toJS();
        var theme = data.theme || {};
        var general = data.general || {};
        var hero = data.hero || {};
        var services = data.services || {};
        var quoteForm = data.quoteForm || {};
        var footer = data.footer || {};

        // Apply theme colors to preview iframe
        var styles = {
            '--color-primary': theme.primary || '#0066CC',
            '--color-accent': theme.accent || '#FF9900',
            '--color-accent-soft': theme.accentSoft || '#00CC99',
            '--color-bg-light': theme.bgLight || '#F5F7FA',
            '--color-text': theme.text || '#222222'
        };

        return h('div', { style: styles },
            // Header Preview (Simplified)
            h('header', { className: 'header', style: { padding: '1rem 0', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' } },
                h('div', { className: 'container', style: { display: 'flex', alignItems: 'center', gap: '1rem' } },
                    h('img', { src: general.logo || '/assets/logo.png', style: { height: '40px' } }),
                    h('span', { style: { fontWeight: 'bold', fontSize: '1.2rem', color: styles['--color-primary'] } }, 'Fletes Matcris')
                )
            ),

            // Hero Section Preview
            h('section', { className: 'hero' },
                h('div', { className: 'hero-container' },
                    h('div', { className: 'hero-content' },
                        h('h1', { className: 'hero-title' }, hero.title || 'Título'),
                        h('p', { className: 'hero-subtitle' }, hero.subtitle || 'Subtítulo'),
                        h('div', { className: 'hero-actions' },
                            h('button', { className: 'btn btn-primary' }, 'Cotizar Ahora'),
                            h('button', { className: 'btn btn-accent' }, hero.buttonText || 'Ver Servicios')
                        )
                    ),
                    h('div', { className: 'hero-image' },
                        h('img', { src: hero.image || '/assets/truck.png', alt: 'Camión' })
                    )
                )
            ),

            // Services Section Preview
            h('section', { className: 'services-section' },
                h('div', { className: 'container' },
                    h('h2', { className: 'section-title' }, services.title || 'Nuestros Servicios'),
                    h('p', { className: 'section-subtitle' }, services.subtitle || 'Descripción'),

                    // Fleet Section
                    h('div', { className: 'fleet-section' },
                        h('h3', { className: 'fleet-title' }, services.fleetTitle || 'Nuestra Flota'),
                        h('div', { className: 'fleet-image-container' },
                            h('img', { className: 'fleet-image', src: services.fleetImage || '/assets/trucks-fleet.jpg' })
                        )
                    ),

                    // Services Grid
                    h('div', { className: 'services-grid' },
                        services.items ? services.items.map(function (item, index) {
                            return h('div', { className: 'service-card', key: index },
                                h('div', { className: 'service-image' },
                                    h('img', { src: item.image })
                                ),
                                h('div', { className: 'service-content' },
                                    h('h3', {}, item.title),
                                    h('p', {}, item.description)
                                )
                            );
                        }) : null
                    )
                )
            ),

            // Quote Form Preview (Visual only)
            h('section', { className: 'quote-section', style: { padding: '5rem 0', background: 'white' } },
                h('div', { className: 'container' },
                    h('h2', { className: 'section-title' }, quoteForm.title || "Cotiza tu Flete"),
                    h('p', { className: 'section-subtitle' }, quoteForm.subtitle || "Completa el formulario...")
                )
            ),

            // Footer Preview
            h('footer', { className: 'footer', style: { background: '#333', color: 'white', padding: '3rem 0' } },
                h('div', { className: 'container', style: { textAlign: 'center' } },
                    h('p', { style: { marginBottom: '1rem' } }, footer.text || "Texto del footer"),
                    h('p', { style: { opacity: 0.7, fontSize: '0.9rem' } }, footer.copyright || "Copyright")
                )
            )
        );
    }
});

CMS.registerPreviewTemplate('site_content', SiteContentPreview);
CMS.registerPreviewStyle('/admin/admin-styles.css');

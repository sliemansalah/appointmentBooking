<template>
    <div :class="sidebarbg" class="app-sidebar sidebar-shadow" 
    @mouseover="toggleSidebarHover('add','closed-sidebar-open')" 
    @mouseleave="toggleSidebarHover('remove','closed-sidebar-open')">
        <div class="app-header__logo">
            <h4 class="mt-2 mr-2">{{$t('BookingSystem')}}</h4>
            <!-- <img class="mr-2" width="20" height="20" src="/assets/images/favicon.png" alt=""> -->
            <!-- <div class="logo-src"/> -->
            <!-- <div class="header__pane ml-auto">
                <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" 
                :class="{ 'is-active' : isOpen }" @click="toggleBodyClass('closed-sidebar')">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div> -->
        </div>
        <div class="app-sidebar-content pt-4">
            <VuePerfectScrollbar class="app-sidebar-scroll" v-once>
                <sidebar-menu showOneChild :menu="menu"/>
            </VuePerfectScrollbar>
        </div>

    </div>
</template>

<script>
    import {SidebarMenu} from 'vue-sidebar-menu'
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    export default {
        components: {
            SidebarMenu,
            VuePerfectScrollbar
        },
        data() {
            return {
                isOpen: false,
                sidebarActive: false,
                
                menu: [
                    {
                        title: this.$t('Services'),
                        icon: 'pe-7s-server',
                        href: '/admin/services',
                    },
                    {
                        title: this.$t('Appointments'),
                        icon: 'pe-7s-bookmarks',
                        href: '/admin/appointments',
                    },
                    {
                        title: this.$t('AppointmentsTable'),
                        icon: 'pe-7s-notebook',
                        href: '/admin/appointments-table',
                    },
                    {
                        title: this.$t('Users'),
                        icon: 'pe-7s-users',
                        href: '/admin/users',
                    },
                ],
                collapsed: true,
                windowWidth: 0,

            }
        },
        props: {
            sidebarbg: String,

        },
        methods: {

            toggleBodyClass(className) {
                const el = document.body;
                this.isOpen = !this.isOpen;

                if (this.isOpen) {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            },
            toggleSidebarHover(add, className) {
                const el = document.body;
                this.sidebarActive = !this.sidebarActive;

                this.windowWidth = document.documentElement.clientWidth;

                if (this.windowWidth > '992') {
                    if (add === 'add') {
                        el.classList.add(className);
                    } else {
                        el.classList.remove(className);
                    }
                }
            },
            getWindowWidth() {
                const el = document.body;

                this.windowWidth = document.documentElement.clientWidth;

                if (this.windowWidth < '1250') {
                    el.classList.add('closed-sidebar', 'closed-sidebar-md');
                } else {
                    el.classList.remove('closed-sidebar', 'closed-sidebar-md');
                }
            },
        },
        mounted() {
            this.$nextTick(function () {
                window.addEventListener('resize', this.getWindowWidth);

                //Init
                this.getWindowWidth()
            })
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.getWindowWidth);
        }
    }
</script>

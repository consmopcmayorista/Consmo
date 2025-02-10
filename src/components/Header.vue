<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import codigos from './js/app.js'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>
<template>
                <!-- search wrapper  -->
                <div class="search_wrap d-none d-lg-block">
                    <!-- search input box  -->
                    <div class="search d-flex">
                        <div class="search_category">
                            <select class="" v-model="categoria">
                              <option value="">Categorias</option>
                              
                              
                              <option v-for="dato in categorias" :value="dato.categoria" v-if="dato.cat_padre==='0'">{{dato.categoria}}</option>
                             
                            </select>
                        </div>
                        <div class="search_input">
                            <input type="text" placeholder="Buscar" id="show_suggest"   v-model="busqueda" @input="filtrarProductos"  @keyup.enter="redirigirAListaDeProductos(busqueda)" autocomplete="off">
                        </div>
                        <div class="search_subimt">
                            <button @click="redirigirAListaDeProductos(busqueda)">
                                <span class="icon">
                                <span  class="d-none d-sm-inline-block">Buscar</span>
                                    <i class="las la-search"></i>
                                 </span>
    
                            </button>
                        </div>
                        <!-- search suggest -->
                    <div class="search_suggest shadow-sm">
                            <div class="search_result_product">
                               <!-- search result single product  -->
                                
                <a :href="'product-view.html?producto=' + dato.id" class="single_sresult_product" v-for="(dato, index) of producto_buscado" :key="index">
                                    <div class="sresult_img">
                                       <!--  <img loading="lazy"  :src=dato.imagen alt="product">-->
                                    </div>
                                    <div class="sresult_content">
                                        <h4>{{dato.titulo}}</h4>
                                        <div class="price">
                                            <span class="org_price">${{ Math.round(parseFloat(dato.pt1)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}</span>
                                        </div>
                                    </div>
                                </a>
                            

                            </div>
                        </div>
                    </div>
                </div>
                   <!-- shop cart wrapper  -->
                    <div class="shopcart">
                        <a href="shopping-cart.html" class="icon_wrp text-center d-none d-lg-block">
                            <span class="icon">
                                <i class="icon-cart"></i>
                            </span>
                            <span class="icon_text">Carrito</span>
                            <span class="pops2">{{cant_en_carrito}}</span>
                        </a>
                        <div class="shopcart_dropdown">
                            <div class="cart_droptitle">
                                <h4 class="text_lg">{{cant_en_carrito}} Productos</h4>
                            </div>
                            <div class="cartsdrop_wrap" if="lista_productos">
                                
                                  <div class="muestra" id="muestra"></div>      
                              
                   
                            </div>
                            <div class="total_cartdrop">
                                <h4 class="text_lg text-uppercase mb-0">Sub Total:</h4>
                                <h4 class="text_lg mb-0 ms-2" id="total_ticket"></h4>
                            </div>
                           <!-- mobile cart button  -->
                            <div class="cartdrop_footer d-flex mt-3">
                                <a href="shopping-cart.html" class="default_btn w-50 text_xs px-1">Ver Carro</a>
                                 <a href="checkout.html" class="default_btn second ms-3 w-50 text_xs px-1">Pagar</a>
                            </div>
                        </div>
                    </div>
    </template>

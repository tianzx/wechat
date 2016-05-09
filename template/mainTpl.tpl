                       
                         <div class="span12">
                            <section class="vue_edit" id="vue_edit">
                            	<div class="span4">
									<section id="edit_block" class="edit_block">
										<ul class="nav nav-tabs">
											<li ng-repeat="section in items "><a class="active" data-toggle="tab"  ui-sref=".template({id:{{section}}})" ui-sref-active="active" href="tianzx.template/{{section}}" >页面{{section}}</a></li>
										</ul>
										<div class="tab-content">
											<section data-page="0" class="page_edit" style="display: block;" ui-view="viewA" ng-controller="posterController1">
											</section>
										</div>
										<section class="save_data">
               				   			   <!--<button class="save_btn wx-btn wx-btn-green" ng-click="submit()">保存</button>-->
              				 		  </section>
									</section>
								</div>
								<div class="span7">
									<section id="phone" class="phone">
										<section class="phone_ac">
											<span>页面预览</span>
											<a id="preview" class="a_preview"> <i class="icon-mobile-phone"></i>
											</a>
										</section>
										<section data-page="0" class="section-drag phone-page" style="display: block;">
											<div id="moduleView" ui-view="viewB" ng-controller="posterController2">
											</div>
										</section>
									</section>
								 </div>
								</section>
								
							</div>
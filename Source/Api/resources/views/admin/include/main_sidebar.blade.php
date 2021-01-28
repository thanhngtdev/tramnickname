<?php
/**
 * Created by PhpStorm.
 * User: QuanVH
 * Date: 01/11/2016
 * Time: 22:39 CH
 */
        ?>
<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu">
            <li class="header">Navigation</li>
            <li class="">
                <a href="{!! route('admin.dashboard') !!}">
                    <i class="fa fa-dashboard text-red"></i> <span>Dashboard</span>
                </a>
            </li>

            @role('Super Admin|Master Admin')
            <li class="treeview">
                <a href="#">
                    <i class="fa fa-users text-red"></i>
                    <span>Sub Admin</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">
                    <li>
                        <a href="{!! route('admin.user.getListSub') !!}">
                            <i class="fa fa-user"></i>List Sub admin
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.user.getAddSub') !!}">
                            <i class="fa fa-user"></i>Add Sub admin
                        </a>
                    </li>
                </ul>
            </li>
            @endrole

            @role('Franchise Admin')
            <li class="treeview">
                <a href="#">
                    <i class="fa fa-users text-red"></i>
                    <span>Academy Manager</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">
                    <li>
                        <a href="{!! route('admin.site.getListFr') !!}">
                            <i class="fa fa-user"></i>List Academy
                        </a>
                    </li>
                </ul>
            </li>
            @endrole

            @role('Super Admin|Master Admin|Sub Admin')
            <li class="treeview">
                <a href="#">
                    <i class="fa fa-users text-red"></i>
                    <span>Franchise Admin</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">
                    <li>
                        <a href="{!! route('admin.user.getListFr') !!}">
                            <i class="fa fa-user"></i>List Franchise admin
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.user.getAddFr') !!}">
                            <i class="fa fa-user"></i>Add Franchise admin
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.site.getList') !!}">
                            <i class="fa fa-user"></i>List Academy
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.site.getAdd') !!}">
                            <i class="fa fa-user"></i>Add Academy
                        </a>
                    </li>
                </ul>
            </li>
            @endrole

            @role('Super Admin|Franchise Admin')
            <li class="treeview hidden">
                <a href="#">
                    <i class="fa fa-users text-red"></i>
                    <span>Micro site</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">
                    <li>
                        <a href="{!! route('admin.user.getAddFr') !!}">
                            <i class="fa fa-user"></i>Info
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.user.getAddFr') !!}">
                            <i class="fa fa-user"></i>Testimonials
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.user.getAddFr') !!}">
                            <i class="fa fa-user"></i>Weekly training
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.user.getAddFr') !!}">
                            <i class="fa fa-user"></i>Session costs
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.user.getAddFr') !!}">
                            <i class="fa fa-user"></i>Holiday camp
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.user.getAddFr') !!}">
                            <i class="fa fa-user"></i>Coach Info
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.user.getAddFr') !!}">
                            <i class="fa fa-user"></i>1on1 coaching
                        </a>
                    </li>

                    <li>
                        <a href="{!! route('admin.user.getAddFr') !!}">
                            <i class="fa fa-user"></i>FAQ
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.user.getAddFr') !!}">
                            <i class="fa fa-user"></i>News
                        </a>
                    </li>
                </ul>
            </li>
            @endrole

            @role('Super Admin|Master Admin|Sub Admin')
            <li class="treeview">
                <a href="#">
                    <i class="fa fa-users text-red"></i>
                    <span>News</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">
                    <li>
                        <a href="{!! route('admin.article.getList') !!}">
                            <i class="fa fa-user"></i>List News
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.qna.getList') !!}">
                            <i class="fa fa-user"></i>List FAQ
                        </a>
                    </li>
                </ul>
            </li>

            <li class="treeview">
                <a href="#">
                    <i class="fa fa-file-word-o text-red"></i>
                    <span>Homepage management</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">
                    <li>
                        <a href="{!! route('admin.config.getEdit',100) !!}">
                            <i class="fa fa-file-word-o"></i>Home top info
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',101) !!}">
                            <i class="fa fa-file-word-o"></i>Home intro
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',102) !!}">
                            <i class="fa fa-file-word-o"></i>What we do
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',105) !!}">
                            <i class="fa fa-file-word-o"></i>Image gallery
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',106) !!}">
                            <i class="fa fa-file-word-o"></i>Reason choose WMF
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',107) !!}">
                            <i class="fa fa-file-word-o"></i>Football begining
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',108) !!}">
                            <i class="fa fa-file-word-o"></i>10 Year
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',109) !!}">
                            <i class="fa fa-file-word-o"></i>Insta feed
                        </a>
                    </li>

                </ul>
            </li>

            <li class="treeview">
                <a href="#">
                    <i class="fa fa-file-word-o text-red"></i>
                    <span>Franchise management</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">
                    <li>
                        <a href="{!! route('admin.config.getEdit',114) !!}">
                            <i class="fa fa-file-word-o"></i>About Weekly training
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',110) !!}">
                            <i class="fa fa-file-word-o"></i>Academy Intro
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',111) !!}">
                            <i class="fa fa-file-word-o"></i>Each week Weekly training
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',112) !!}">
                            <i class="fa fa-file-word-o"></i>4 skill gain
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',113) !!}">
                            <i class="fa fa-file-word-o"></i>Why WMF
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',115) !!}">
                            <i class="fa fa-file-word-o"></i>About Holiday camp
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',116) !!}">
                            <i class="fa fa-file-word-o"></i>Typical day camp
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',117) !!}">
                            <i class="fa fa-file-word-o"></i>About 1on1 training
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',118) !!}">
                            <i class="fa fa-file-word-o"></i>Training intro
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',119) !!}">
                            <i class="fa fa-file-word-o"></i>About Birthday
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',120) !!}">
                            <i class="fa fa-file-word-o"></i>About Birthday 2
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',121) !!}">
                            <i class="fa fa-file-word-o"></i>Key Birthday Party
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',122) !!}">
                            <i class="fa fa-file-word-o"></i>Birthday Package
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',123) !!}">
                            <i class="fa fa-file-word-o"></i>Party Include
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',124) !!}">
                            <i class="fa fa-file-word-o"></i>Optional Extras
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',125) !!}">
                            <i class="fa fa-file-word-o"></i>Contact about 1
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',126) !!}">
                            <i class="fa fa-file-word-o"></i>Contact about 2
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',127) !!}">
                            <i class="fa fa-file-word-o"></i>Contact about 3
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',128) !!}">
                            <i class="fa fa-file-word-o"></i>Contact about 4
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',129) !!}">
                            <i class="fa fa-file-word-o"></i>Contact about 5
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',130) !!}">
                            <i class="fa fa-file-word-o"></i>Training service
                        </a>
                    </li>
                </ul>
            </li>
            @endrole

            @role('Super Admin|Master Admin')
            <li class="treeview">
                <a href="#">
                    <i class="fa fa-lock text-red"></i>
                    <span>Super admin</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul class="treeview-menu">
                    <li>
                        <a href="{!! route('admin.article.cate.getList') !!}">
                            <i class="fa fa-lock"></i> News & FAQ category
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.article.cate.getAdd',1) !!}">
                            <i class="fa fa-lock"></i> Add Cate News & FAQ
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.user.getList') !!}">
                            <i class="fa fa-lock"></i> List User
                        </a>
                    </li>
                    <li>
                        <a href="{!! route('admin.config.getEdit',131) !!}">
                            <i class="fa fa-lock"></i> WMF Contact Info
                        </a>
                    </li>
                </ul>
            </li>
            @endrole
        </ul>
    </section>
    <!-- /.sidebar -->
</aside>


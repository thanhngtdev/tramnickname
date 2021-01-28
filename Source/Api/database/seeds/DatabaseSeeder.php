<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $this->call([
             UserSeeder::class,
             CateArticleSeeder::class,
             RolesAndPermissionsSeeder::class,
             ConfigTableSeeder::class,
//             MicrositeSeeder::class,
             FeedbackSeeder::class,
         ]);
    }
}

class CateArticleSeeder extends Seeder{
    public function run()
    {
        DB::table('cate_article')->insert([
            array(
                'cate_id' => 1,
                'cate_name' => 'Becoming a pro',
                'cate_value' => 'Becoming a pro',
                'cate_alias' => 'becoming-a-pro',
                'cate_parent' => 0,
                'cate_status' => 1
            ),
            array(
                'cate_id' => 2,
                'cate_name' => 'Success Stories',
                'cate_value' => 'Success Stories',
                'cate_alias' => 'success-stories',
                'cate_parent' => 0,
                'cate_status' => 1
            ),
            array(
                'cate_id' => 3,
                'cate_name' => 'Coaching Best Practices',
                'cate_value' => 'Coaching Best Practices',
                'cate_alias' => 'coaching-best-practices',
                'cate_parent' => 0,
                'cate_status' => 1
            ),
            array(
                'cate_id' => 4,
                'cate_name' => 'Training Tips',
                'cate_value' => 'Training Tips',
                'cate_alias' => 'training-tips',
                'cate_parent' => 0,
                'cate_status' => 1
            ),
            array(
                'cate_id' => 5,
                'cate_name' => 'WMF News',
                'cate_value' => 'WMF News',
                'cate_alias' => 'wmf-news',
                'cate_parent' => 0,
                'cate_status' => 1
            ),

            array(
                'cate_id' => 6,
                'cate_name' => 'Weekly Training',
                'cate_value' => 'Weekly Training',
                'cate_alias' => 'weekly-training',
                'cate_parent' => 0,
                'cate_status' => 2
            ),
            array(
                'cate_id' => 7,
                'cate_name' => 'Facilities',
                'cate_value' => 'Facilities',
                'cate_alias' => 'facilities',
                'cate_parent' => 0,
                'cate_status' => 2
            ),
            array(
                'cate_id' => 8,
                'cate_name' => 'Equipment',
                'cate_value' => 'Equipment',
                'cate_alias' => 'equipment',
                'cate_parent' => 0,
                'cate_status' => 2
            ),
            array(
                'cate_id' => 9,
                'cate_name' => 'Holiday Camps',
                'cate_value' => 'Holiday Camps',
                'cate_alias' => 'holiday-camps',
                'cate_parent' => 0,
                'cate_status' => 2
            ),
            array(
                'cate_id' => 10,
                'cate_name' => 'Payments',
                'cate_value' => 'Payments',
                'cate_alias' => 'payments',
                'cate_parent' => 0,
                'cate_status' => 2
            ),
            array(
                'cate_id' => 11,
                'cate_name' => 'Health & Safety',
                'cate_value' => 'Health & Safety',
                'cate_alias' => 'health-safety',
                'cate_parent' => 0,
                'cate_status' => 2
            ),
            array(
                'cate_id' => 12,
                'cate_name' => 'Class Times',
                'cate_value' => 'Class Times',
                'cate_alias' => 'class-times',
                'cate_parent' => 6,
                'cate_status' => 2
            ),
            array(
                'cate_id' => 13,
                'cate_name' => 'Something else',
                'cate_value' => 'Something else',
                'cate_alias' => 'something-else',
                'cate_parent' => 6,
                'cate_status' => 2
            ),
            array(
                'cate_id' => 14,
                'cate_name' => '1 on 1 training',
                'cate_value' => '1 on 1 training',
                'cate_alias' => '1-on-1-training',
                'cate_parent' => 0,
                'cate_status' => 2
            ),
            array(
                'cate_id' => 15,
                'cate_name' => 'Birthday Party',
                'cate_value' => 'Birthday Party',
                'cate_alias' => 'birthday-party',
                'cate_parent' => 0,
                'cate_status' => 2
            ),
            array(
                'cate_id' => 16,
                'cate_name' => 'Location Landing',
                'cate_value' => 'Location Landing',
                'cate_alias' => 'location-landing',
                'cate_parent' => 0,
                'cate_status' => 2
            ),
        ]);
    }
}

class UserSeeder extends Seeder
{
    public function run()
    {
        DB::table('user')->insert([
            array(
                'user_id' => 1,
                'user_name' => 'quanvh',
                'user_showName' => "Mr.Don't Ask",
                'password' => '$2y$10$o7wLww6zVjsqLERXVG5M9.b6kK31aj5St8Bx5cgoAz86h2CVu31Va',
                'user_des' => 'Mr.Don\'t Ask super administrator',
                'user_email' => 'master@aqgroup.vn',
                'user_phone' => '0987654321',
                'user_avatar' => '',
                'user_address' => '',
                'user_type' => \App\Http\DAL\DAL_Config::TYPE_USER_SYSTEM,
                'user_verify' => 1,
                'remember_token' => '',
            ),
            array(
                'user_id' => 2,
                'user_name' => 'admin',
                'user_showName' => 'We make footballer',
                'password' => '$2y$10$o7wLww6zVjsqLERXVG5M9.b6kK31aj5St8Bx5cgoAz86h2CVu31Va',
                'user_des' => 'wmf administrator',
                'user_email' => '',
                'user_phone' => '',
                'user_avatar' => '',
                'user_address' => '',
                'user_type' => \App\Http\DAL\DAL_Config::TYPE_USER_SYSTEM,
                'user_verify' => 0,
                'remember_token' => '',
            ),
        ]);
    }
}


class MicrositeSeeder extends Seeder
{
    public function run()
    {
        DB::table('micro_site')->insert([
            array(
                'ms_id' => 1,
                'ms_name' => 'Beckenham',
                'ms_alias' => 'beckenham',
                'ms_region' => 'London',
                'ms_latitude' => '51.3993363',
                'ms_longitude' => '-0.0282487',
                'ms_address' => 'Harris Academy Beckenham, Beckenham BR3 3SJ, UK',
            ),
            array(
                'ms_id' => 2,
                'ms_name' => 'Bexleyheath',
                'ms_alias' => 'bexleyheath',
                'ms_region' => 'London',
                'ms_latitude' => '51.4591486',
                'ms_longitude' => '0.1419925',
                'ms_address' => 'Bexleyheath DA6 7EG, UK',
            ),

            array(
                'ms_id' => 3,
                'ms_name' => 'Bletchley',
                'ms_alias' => 'bletchley',
                'ms_region' => 'London',
                'ms_latitude' => '51.9800568',
                'ms_longitude' => '-0.7296472',
                'ms_address' => 'Bletchley, Milton Keynes MK2 3HQ, UK',
            ),

            array(
                'ms_id' => 4,
                'ms_name' => 'Brent',
                'ms_alias' => 'brent',
                'ms_region' => 'London',
                'ms_latitude' => '51.5632455',
                'ms_longitude' => '-0.2440187',
                'ms_address' => 'The Crest Academy Crest Rd, London NW2 7SN',
            ),
            array(
                'ms_id' => 5,
                'ms_name' => 'Bromley',
                'ms_alias' => 'bromley',
                'ms_region' => 'London',
                'ms_latitude' => '51.427905',
                'ms_longitude' => '0.0145017',
                'ms_address' => 'Bromley BR1 5EB, UK',
            ),
            array(
                'ms_id' => 6,
                'ms_name' => 'Carshalton',
                'ms_alias' => 'carshalton',
                'ms_region' => 'London',
                'ms_latitude' => '51.3709324',
                'ms_longitude' => '-0.1716963',
                'ms_address' => 'Carshalton High School for Girls, Carshalton SM5 2QX, UK',
            ),
            array(
                'ms_id' => 7,
                'ms_name' => 'Carshalton Beeches',
                'ms_alias' => 'carshalton-beeches',
                'ms_region' => 'London',
                'ms_latitude' => '51.3477396',
                'ms_longitude' => '-0.16833',
                'ms_address' => 'Stanley Park High School, Damson Way, Carshalton SM5 4NS, UK',
            ),
            array(
                'ms_id' => 8,
                'ms_name' => 'Chiswick',
                'ms_alias' => 'chiswick',
                'ms_region' => 'London',
                'ms_latitude' => '51.4806313',
                'ms_longitude' => '-0.2621746',
                'ms_address' => 'Chiswick School, Burlington Lane, London W4 3UN, UK',
            ),
            array(
                'ms_id' => 9,
                'ms_name' => 'Coulsdon',
                'ms_alias' => 'coulsdon',
                'ms_region' => 'London',
                'ms_latitude' => '51.2989708',
                'ms_longitude' => '-0.11438',
                'ms_address' => 'Oasis Academy Coulsdon, 50 Homefield Road, Coulsdon CR5 1ES, UK',
            ),
            array(
                'ms_id' => 10,
                'ms_name' => 'Croydon',
                'ms_alias' => 'croydon',
                'ms_region' => 'London',
                'ms_latitude' => '51.3749457',
                'ms_longitude' => '-0.0615854',
                'ms_address' => 'Trinity School Shirley Park, Croydon',
            ),

            array(
                'ms_id' => 40,
                'ms_name' => 'Croydon North',
                'ms_alias' => 'croydon-north',
                'ms_region' => 'London',
                'ms_latitude' => '51.3912263',
                'ms_longitude' => '-0.1393143',
                'ms_address' => 'Croydon CR9 3AS, UK',
            ),

            array(
                'ms_id' => 11,
                'ms_name' => 'Ealing',
                'ms_alias' => 'ealing',
                'ms_region' => 'London',
                'ms_latitude' => '51.5196755',
                'ms_longitude' => '-0.3408178',
                'ms_address' => 'Greenford Ave, Hanwell, London',
            ),
            array(
                'ms_id' => 12,
                'ms_name' => 'Essex',
                'ms_alias' => 'essex',
                'ms_region' => 'London',
                'ms_latitude' => '51.5595647',
                'ms_longitude' => '0.1720618',
                'ms_address' => 'Dagenham, Romford RM7 0XU, UK',
            ),
            array(
                'ms_id' => 13,
                'ms_name' => 'Feltham',
                'ms_alias' => 'feltham',
                'ms_region' => 'London',
                'ms_latitude' => '51.4434863',
                'ms_longitude' => '-0.4133753',
                'ms_address' => 'High Street, Feltham TW13 4AB, UK',
            ),
            array(
                'ms_id' => 14,
                'ms_name' => 'Finchley',
                'ms_alias' => 'finchley',
                'ms_region' => 'London',
                'ms_latitude' => '51.5913802',
                'ms_longitude' => '-0.1890844',
                'ms_address' => 'Christs College Finchley, East End Road, London N2 0SE, UK',
            ),
            array(
                'ms_id' => 15,
                'ms_name' => 'Greenwich',
                'ms_alias' => 'greenwich',
                'ms_region' => 'London',
                'ms_latitude' => '51.4514857',
                'ms_longitude' => '0.0361598',
                'ms_address' => 'Harris Academy, Middle Park Ave, Eltham',
            ),
            array(
                'ms_id' => 16,
                'ms_name' => 'Ham',
                'ms_alias' => 'ham',
                'ms_region' => 'London',
                'ms_latitude' => '51.4389103',
                'ms_longitude' => '-0.3143287',
                'ms_address' => 'Grey Court School, Richmond TW10 7HN, UK',
            ),
            array(
                'ms_id' => 41,
                'ms_name' => 'High Barnet',
                'ms_alias' => 'high-barnet',
                'ms_region' => 'London',
                'ms_latitude' => '51.6468178',
                'ms_longitude' => '-0.1934479',
                'ms_address' => 'Ark Pioneer Academy, Westcombe Drive, London, EN5 2BE',
            ),
            array(
                'ms_id' => 17,
                'ms_name' => 'Hornchurch',
                'ms_alias' => 'hornchurch',
                'ms_region' => 'London',
                'ms_latitude' => '51.5498747',
                'ms_longitude' => '0.2136531',
                'ms_address' => 'Hornchurch RM12 6RT, UK',
            ),
            array(
                'ms_id' => 18,
                'ms_name' => 'Hounslow',
                'ms_alias' => 'hounslow',
                'ms_region' => 'London',
                'ms_latitude' => '51.4772576',
                'ms_longitude' => '-0.369825',
                'ms_address' => 'Lampton School, Lampton Avenue, Hounslow TW3 4EP, UK',
            ),
            array(
                'ms_id' => 19,
                'ms_name' => 'Isleworth',
                'ms_alias' => 'isleworth',
                'ms_region' => 'London',
                'ms_latitude' => '51.4795466',
                'ms_longitude' => '-0.3273849',
                'ms_address' => 'The Green School, London Rd, Busch Corner, Isleworth TW7 5BB, UK',
            ),
            array(
                'ms_id' => 20,
                'ms_name' => 'Kilburn',
                'ms_alias' => 'kilburn',
                'ms_region' => 'London',
                'ms_latitude' => '51.5408657',
                'ms_longitude' => '-0.2200038',
                'ms_address' => 'Aylestone Avenue, London NW6 7BQ, UK',
            ),
            array(
                'ms_id' => 21,
                'ms_name' => 'Kingston',
                'ms_alias' => 'kingston',
                'ms_region' => 'London',
                'ms_latitude' => '51.425392',
                'ms_longitude' => '-0.3048928',
                'ms_address' => 'Kingston upon Thames KT2 5PL, UK',
            ),
            array(
                'ms_id' => 22,
                'ms_name' => 'Leighton Buzzard',
                'ms_alias' => 'leighton-buzzard',
                'ms_region' => 'London',
                'ms_latitude' => '51.9263432',
                'ms_longitude' => '-0.6495021',
                'ms_address' => 'Vandyke Rd, Leighton Buzzard, UK',
            ),
            array(
                'ms_id' => 23,
                'ms_name' => 'Loughton',
                'ms_alias' => 'loughton',
                'ms_region' => 'London',
                'ms_latitude' => '51.6536791',
                'ms_longitude' => '0.0865829',
                'ms_address' => 'Debden Park High School, Willingale Road,Loughton, IG10 2BQ',
            ),
            array(
                'ms_id' => 24,
                'ms_name' => 'Mill Hill',
                'ms_alias' => 'mill hill',
                'ms_region' => 'London',
                'ms_latitude' => '51.608699',
                'ms_longitude' => '-0.2343115',
                'ms_address' => 'Copthall School, Pursley Road, Mill Hill, London NW7 2EP',
            ),
            array(
                'ms_id' => 25,
                'ms_name' => 'Milton Keynes',
                'ms_alias' => 'milton-keynes',
                'ms_region' => 'London',
                'ms_latitude' => '52.0433244',
                'ms_longitude' => '-0.839808',
                'ms_address' => 'Milton Keynes MK11 4BJ, UK',
            ),
            array(
                'ms_id' => 26,
                'ms_name' => 'New Beckenham',
                'ms_alias' => 'new beckenham',
                'ms_region' => 'London',
                'ms_latitude' => '51.4156889',
                'ms_longitude' => '-0.0433605',
                'ms_address' => 'Harris Academy Bromley, Lennard Road, Beckenham BR3 1QR, UK',
            ),
            array(
                'ms_id' => 27,
                'ms_name' => 'Osterley',
                'ms_alias' => 'osterley',
                'ms_region' => 'London',
                'ms_latitude' => '51.4792089',
                'ms_longitude' => '-0.3575',
                'ms_address' => 'Oaklands School, Gresham Rd, Hounslow',
            ),
            array(
                'ms_id' => 28,
                'ms_name' => 'Redbridge',
                'ms_alias' => 'redbridge',
                'ms_region' => 'London',
                'ms_latitude' => '51.5784699',
                'ms_longitude' => '0.0893845',
                'ms_address' => 'Oaks Park High School, Oaks Lane, Ilford IG2 7PQ, UK',
            ),
            array(
                'ms_id' => 29,
                'ms_name' => 'Richmond',
                'ms_alias' => 'richmond',
                'ms_region' => 'London',
                'ms_latitude' => '51.4589253',
                'ms_longitude' => '-0.2901737',
                'ms_address' => 'Christs School, Queens Rd, Richmond TW10 6HW, UK',
            ),
            array(
                'ms_id' => 30,
                'ms_name' => 'Southall',
                'ms_alias' => 'southall',
                'ms_region' => 'London',
                'ms_latitude' => '51.5097536',
                'ms_longitude' => '-0.3752166',
                'ms_address' => 'Villiers High School, Boyd Ave, Middlesex, Southall, UB1 3BT',
            ),
            array(
                'ms_id' => 31,
                'ms_name' => 'Sunbury',
                'ms_alias' => 'sunbury',
                'ms_region' => 'London',
                'ms_latitude' => '51.4102511',
                'ms_longitude' => '-0.4275014',
                'ms_address' => 'Bishop Wand School, Sunbury-on-Thames TW16 6LT, UK',
            ),
            array(
                'ms_id' => 32,
                'ms_name' => 'Surbiton',
                'ms_alias' => 'surbiton',
                'ms_region' => 'London',
                'ms_latitude' => '51.3756102',
                'ms_longitude' => '-0.3038007',
                'ms_address' => 'Southborough High School, Hook Road, Surbiton, Surrey KT6 5AS',
            ),
            array(
                'ms_id' => 33,
                'ms_name' => 'Syon Lane',
                'ms_alias' => 'syon lane',
                'ms_region' => 'London',
                'ms_latitude' => '',
                'ms_longitude' => '',
                'ms_address' => '',
            ),
            array(
                'ms_id' => 34,
                'ms_name' => 'Teddington',
                'ms_alias' => 'teddington',
                'ms_region' => 'London',
                'ms_latitude' => '51.4370293',
                'ms_longitude' => '-0.3372588',
                'ms_address' => "St Mary's University, Waldegrave Rd, Twickenham, TW1 4SX",
            ),
            array(
                'ms_id' => 35,
                'ms_name' => 'Twickenham',
                'ms_alias' => 'twickenham',
                'ms_region' => 'London',
                'ms_latitude' => '51.4500666',
                'ms_longitude' => '-0.3230087',
                'ms_address' => 'Orleans Park School, Richmond Road, Twickenham TW1 3BB, UK',
            ),
            array(
                'ms_id' => 36,
                'ms_name' => 'Wimbledon',
                'ms_alias' => 'wimbledon',
                'ms_region' => 'London',
                'ms_latitude' => '51.4450413',
                'ms_longitude' => '-0.2000578',
                'ms_address' => 'Southfields Academy, 333 Merton Road',
            ),

            array(
                'ms_id' => 37,
                'ms_name' => 'Cheshire',
                'ms_alias' => 'cheshire',
                'ms_region' => 'North West England',
                'ms_latitude' => '53.0892562',
                'ms_longitude' => '-2.457059',
                'ms_address' => 'South Cheshire College, Crewe CW2 8AB, UK',
            ),
            array(
                'ms_id' => 42,
                'ms_name' => 'Farnborough',
                'ms_alias' => 'farnborough',
                'ms_region' => 'South England',
                'ms_latitude' => '51.2680017',
                'ms_longitude' => '-0.7628439',
                'ms_address' => 'Farnborough GU14 6BH, UK',
            ),
            array(
                'ms_id' => 38,
                'ms_name' => 'Medway',
                'ms_alias' => 'medway',
                'ms_region' => 'South England',
                'ms_latitude' => '51.3810481',
                'ms_longitude' => '0.5652505',
                'ms_address' => 'The Woodlands Sports Centre, The Academy of Woodlands, Woodlands Rd, Gillingham ME7 2DU',
            ),
            array(
                'ms_id' => 43,
                'ms_name' => 'Redhill',
                'ms_alias' => 'redhill',
                'ms_region' => 'South England',
                'ms_latitude' => '51.2423037',
                'ms_longitude' => '-0.1609512',
                'ms_address' => 'Redhill RH1 4AD, UK',
            ),
            array(
                'ms_id' => 39,
                'ms_name' => 'Worthing',
                'ms_alias' => 'worthing',
                'ms_region' => 'South England',
                'ms_latitude' => '50.8214734',
                'ms_longitude' => '-0.3692805',
                'ms_address' => 'St Andrew’s C.E. High School For Boys, Sackville Rd, Worthing BN14 8BG, UK',
            ),
        ]);
    }
}

class ConfigTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('config')->insert([
            array(
                'cfg_id' => 1,
                'cfg_name' => 'version',
                'cfg_alias' => null,
                'cfg_order' => 0,
                'cfg_content' => '1.0',
                'cfg_value' => '',
            ),

        ]);
    }
}

class FeedbackSeeder extends Seeder
{
    public function run()
    {
        DB::table('feedback')->insert([
            array(
                'fb_id' => 1,
                'fb_name' => 'Quan Vu',
                'fb_role' => 'Coach',
                'fb_image' => 'microsite/wapplaper_19.jpg',
                'fb_content' => 'Load images or render components on demand or progressively, Load images or render components on demand or progressively. Load images or render components on demand or progressively',
                'fb_status' => 1,
            ),
            array(
                'fb_id' => 2,
                'fb_name' => 'Le Hieu',
                'fb_role' => 'Singer',
                'fb_image' => 'microsite/wapplaper_20.jpg',
                'fb_content' => 'Load images or render components on demand or progressively, Prevents autoplay while hovering on dots. Prevents autoplay while hovering on dots',
                'fb_status' => 1,
            ),
            array(
                'fb_id' => 3,
                'fb_name' => 'Long Pham',
                'fb_role' => 'Parent',
                'fb_image' => 'microsite/wapplaper_21.jpg',
                'fb_content' => 'Prevents autoplay while hovering on dots, Prevents autoplay while hovering on dots',
                'fb_status' => 1,
            ),

        ]);
    }
}


use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
        Role::create(['name' => 'Super Admin']);
        $admin = Role::create(['name' => 'Master Admin']);
        $subAdmin = Role::create(['name' => 'Sub Admin']);
        $franchiseAdmin = Role::create(['name' => 'Franchise Admin']);

        \App\Models\User::find(1)->assignRole('Super Admin');
        \App\Models\User::find(2)->assignRole('Master Admin');

        $editor = Permission::create(['name' => 'Editor']);
        $franchise = Permission::create(['name' => 'Franchise']);
        $franchiseManage = Permission::create(['name' => 'Franchise management']);
        $user = Permission::create(['name' => 'User management']);

        $admin->syncPermissions([$editor, $franchiseManage, $user]);
        $subAdmin->syncPermissions([$editor,$franchiseManage]);
        $franchiseAdmin->syncPermissions([$franchise]);
    }
}

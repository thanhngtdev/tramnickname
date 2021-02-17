<?php

namespace App\Http\Controllers;

use App\Helper\Common;
use App\Helper\Curl;
use App\Models\Config;
use App\Models\MicroSite;
use App\Models\SiteData;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Sunra\PhpSimple\HtmlDomParser;

class DataController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function getData()
    {
        $currentConfig = Config::find(100);
        if (!$currentConfig) {
            $this->addConfig();
        }
        $jsonIterator = json_decode(file_get_contents("academy.json"), TRUE);
        foreach ($jsonIterator as $academy) {
            $academy = (object)$academy;
            MicroSite::create([
                'ms_name' => $academy->loc_name,
                'ms_alias' => Common::createSlug($academy->loc_name),
                'pa_company' => $academy->company_name,
                'pa_companyId' => $academy->company_id,
                'pa_location' => $academy->loc_name,
                'pa_locationId' => $academy->location_id
            ]);
        }
        return 1;
        $lstSite = MicroSite::all();

        foreach ($lstSite as $microSite) {
            $this->getCoachInfo($microSite);
            break;
        }
    }

    public function getCoachInfo($microSite)
    {
        $baseUrl = 'https://www.wemakefootballers.com/' . $microSite->ms_alias . '/weekly-training/';
        print_r($baseUrl);
    }

    public function getInfoMicroSite($microSite)
    {
        $html = file_get_contents('html/' . $microSite->ms_name . '.html');
        $dom = HtmlDomParser::str_get_html($html);

        $this->getGeneralInfo($dom, $microSite);
        $this->deleteMicroSiteData($microSite);
        $this->getTrainingPrice($dom, $microSite);
        $this->getTrainingTime($dom, $microSite);
    }

    public function deleteMicroSiteData($microSite)
    {
        SiteData::where('dt_site', $microSite->ms_id)->delete();
    }

    public function getTrainingPrice($dom, $microSite)
    {
        //get weekly training price
        $trainingPrice = $dom->find("span.weelly_price", 0);

        $trainingPrice = explode(" ", $trainingPrice->plaintext);
        $price = [
            'currency' => substr($trainingPrice[0], 0, 2),
            'price' => substr($trainingPrice[0], -2),
            'time' => count($trainingPrice) > 2 ? $trainingPrice[2] : "",
            'unit' => count($trainingPrice) > 3 ? $trainingPrice[3] : ""
        ];
        SiteData::create([
            'dt_site' => $microSite->ms_id,
            'dt_name' => 'Weekly training price',
            'dt_value' => $price
        ]);
    }

    public function getTrainingTime($dom, $microSite)
    {
        // get weekly training class time
//        $lstCalendar = $dom->find("a.freetrial-trigger");
        $lstCalendar = $dom->find("table", 0);
        $trainingClass = $this->getClassTime($lstCalendar);
        SiteData::create([
            'dt_site' => $microSite->ms_id,
            'dt_name' => 'Weekly training class time',
            'dt_value' => $trainingClass
        ]);
    }

    public function getGeneralInfo(HtmlDomParser $dom, $microSite)
    {
        $curl = new Curl();
        //get general info
        $image = $dom->find("div.img-left-sec", 0);
        $imageAlias = 'microsite/' . $microSite->ms_alias . '.jpg';
        $curl->getImage($image->children(0)->src, 'storage/' . $imageAlias);
        $microSite->ms_avatar = $imageAlias;

        $address = $dom->find("ul.detail-ul", 0);
        $microSite->ms_address = $address->children(0)->text();
        $microSite->ms_email = $address->children(1)->text();
        $microSite->ms_phone = str_replace(" ", "", $address->children(2)->text());
        $microSite->save();
    }

    public function getClassTime($calendar)
    {
        $trainingClass = [];
        $lstCalendar = $calendar->find("a.freetrial-trigger");
        foreach ($lstCalendar as $key => $item) {
            $newClass = [];
            $newDate = explode(' ', $item->text());
            $newClass['date'] = $newDate[0];
            $timeClass = explode("-", substr($item->text(), strlen($newDate[0])));
            $newClass['startTime'] = $timeClass[0];
            $newClass['endTime'] = $timeClass[1];

            $year = $calendar->find("td", 2 * $key + 1);
            $newClass['age'] = trim($year->plaintext);

            array_push($trainingClass, $newClass);
        }
        return $trainingClass;
    }

    public function addConfig()
    {
        Config::create([
            'cfg_id' => 100,
            'cfg_name' => 'Home banner',
            'cfg_title' => 'We make football fun for every child',
            'cfg_des' => "The UK's #1 football academy for children Weekly training and holiday camps for 4-12 year olds",
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => 'We make football fun for every child',
                    'des' => "The UK's #1 football academy for children Weekly training and holiday camps for 4-12 year olds",
                    'content' => '',
                    'icon' => '',
                    'image' => '/images/hs_photo_pc.jpg'
                ]
            ],
        ]);
        Config::create([
            'cfg_id' => 101,
            'cfg_name' => 'Home intro',
            'cfg_title' => 'Home intro',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => 'Personalised coaching for every child',
                    'des' => '',
                    'content' => 'Never kicked a football? Welcome. Want to go pro? Join us. No matter where your child is at in their sporting journey, we give personalised coaching to match their ability.',
                    'icon' => '',
                    'image' => '/images/img1.jpg'
                ],
                [
                    'title' => 'Expert coaches and quality facilities',
                    'des' => '',
                    'content' => 'We hire the best coaches and train at quality grounds both indoors and out, so your child can play in a supportive and safe environment no matter the weather.',
                    'icon' => '',
                    'image' => '/images/img2.jpg'
                ],
                [
                    'title' => '10 years of happy parents',
                    'des' => '',
                    'content' => "We are rated 9.9 out of 10 based on 189 reviews on <a target='_blank' href='https://uk.trustpilot.com/review/wemakefootballers.com'>
                        <img src='http://admin-wmf.muscien.com/storage/images/icon-star.jpg' class='mt'/></a>.
                        With 16 venues throughout England and at a cost of £XXX per weekly session, we offer value for money and ease.",
                    'icon' => '',
                    'image' => '/images/img3.jpg'
                ],
            ],
        ]);
        Config::create([
            'cfg_id' => 102,
            'cfg_name' => 'What we do',
            'cfg_title' => 'What we do',
            'cfg_des' => 'From beginners to the next big name, both training packages are suited to children of all abilities.',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => 'Weekly Group Training',
                    'des' => 'A fresh class every week. Our 39-week school term schedule focuses on a new football fundamental each week along with 1-on-1 practice. Just find a day and time that suits you.',
                    'content' => '',
                    'icon' => '/images/icon-people.png',
                    'image' => ''
                ],
                [
                    'title' => 'School Holiday Camps',
                    'des' => 'The football fundamentals complete with games, matches, tournaments, and catering. Our week-long school holiday camps focus on first-timers, friendship, and children seeking faster progression.',
                    'content' => '',
                    'icon' => '/images/icon-bell.png',
                    'image' => ''
                ]
            ],
        ]);
        Config::create([
            'cfg_id' => 105,
            'cfg_name' => 'Image gallery',
            'cfg_title' => 'Professional, safe & fun!',
            'cfg_des' => 'See what over 3,000 children do at our sessions each week',
            'cfg_content' => '',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => '',
                    'des' => "",
                    'content' => '',
                    'icon' => '',
                    'image' => 'images/gallery1.jpg'
                ],
                [
                    'title' => '',
                    'des' => "",
                    'content' => '',
                    'icon' => '',
                    'image' => 'images/gallery2.jpg'
                ],
                [
                    'title' => '',
                    'des' => "",
                    'content' => '',
                    'icon' => '',
                    'image' => 'images/gallery3.jpg'
                ],
                [
                    'title' => '',
                    'des' => "",
                    'content' => '',
                    'icon' => '',
                    'image' => 'images/gallery4.jpg'
                ],
                [
                    'title' => '',
                    'des' => "",
                    'content' => '',
                    'icon' => '',
                    'image' => 'images/gallery5.jpg'
                ],
                [
                    'title' => '',
                    'des' => "",
                    'content' => '',
                    'icon' => '',
                    'image' => 'images/gallery6.jpg'
                ],

            ],
        ]);
        Config::create([
            'cfg_id' => 106,
            'cfg_name' => 'Reason choose WMF',
            'cfg_title' => '5 Reasons you and your child will love We Make Footballers:',
            'cfg_des' => '',
            'cfg_content' => '',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => '',
                    'des' => "We offer personalised, fun training with no more than 10 children per coach.",
                    'content' => '',
                    'icon' => '',
                    'image' => 'images/imgtab1.jpg'
                ],
                [
                    'title' => '',
                    'des' => "We only employ the best coaches who have a love of football and the next generation.",
                    'content' => '',
                    'icon' => '',
                    'image' => 'images/imgtab2.jpg'
                ],
                [
                    'title' => '',
                    'des' => "We have helped thousands of children improve their fitness and friendship groups.",
                    'content' => '',
                    'icon' => '',
                    'image' => 'images/imgtab1.jpg'
                ],
                [
                    'title' => '',
                    'des' => "We ensure a safe environment for your child with regular risk assessments, and anti-bullying and nut-free policies.",
                    'content' => '',
                    'icon' => '',
                    'image' => 'images/imgtab2.jpg'
                ],
                [
                    'title' => '',
                    'des' => "We only use quality indoor and outdoor facilities for holistic training.",
                    'content' => '',
                    'icon' => '',
                    'image' => 'images/imgtab1.jpg'
                ],
            ],
        ]);
        Config::create([
            'cfg_id' => 107,
            'cfg_name' => 'Football begining',
            'cfg_title' => 'Football is only the beginning',
            'cfg_des' => 'Our unique training method and inclusive environment is proven to help every child feel their best',
            'cfg_content' => '',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => 'Improved technique',
                    'des' => "We break down the football fundamentals in a simple and engaging way. Then, our 1-on-1 drills give your child the time to reinforce what they've learnt at their own pace.",
                    'content' => '',
                    'icon' => '/images/Bitmap1.jpg',
                    'image' => ''
                ],
                [
                    'title' => 'Teammates to mates',
                    'des' => "We only have 10 children per coach to ensure high quality training and the chance for your child to build friendships. We also have strict anti-bullying policies so they will always feel safe.",
                    'content' => '',
                    'icon' => '/images/Bitmap2.jpg',
                    'image' => ''
                ],
                [
                    'title' => 'Healthy children are happier children',
                    'des' => "Exercise is best when it doesn't feel like exercise. Our weekly training and holiday camps are fun, but also boost your child's fitness, speed, movement, and agility too.",
                    'content' => '',
                    'icon' => '/images/Bitmap3.jpg',
                    'image' => ''
                ],
                [
                    'title' => 'A real brain booster',
                    'des' => "It's not just physical and social skills, our unique sessions help with cognitive function too. You will see your child develop better concentration, learning, listening, and decision-making skills week after week.",
                    'content' => '',
                    'icon' => '/images/Bitmap4.jpg',
                    'image' => ''
                ],
            ],
        ]);
        Config::create([
            'cfg_id' => 108,
            'cfg_name' => '10 Year',
            'cfg_title' => '10 years of making football fun',
            'cfg_des' => 'Get to know more about us and check out our frequently asked questions.',
            'cfg_content' => '',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => '10 years of making football fun',
                    'des' => "Get to know more about us and check out our frequently asked questions.",
                    'content' => '',
                    'icon' => '',
                    'image' => '/images/photos10years.jpg'
                ]
            ],
        ]);
        Config::create([
            'cfg_id' => 109,
            'cfg_name' => 'Have fun',
            'cfg_title' => 'Have fun while going pro',
            'cfg_des' => 'Check out our Insta feed of just some of the 160+ players we have helped make pro footballers',
            'cfg_content' => '',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => '@Clyde_Douglas',
                    'des' => '',
                    'content' => '',
                    'icon' => '',
                    'image' => '/images/photo1.jpg'
                ],
                [
                    'title' => '@Clyde_Douglas',
                    'des' => '',
                    'content' => '',
                    'icon' => '',
                    'image' => '/images/photo2.jpg'
                ],
                [
                    'title' => '@Clyde_Douglas',
                    'des' => '',
                    'content' => '',
                    'icon' => '',
                    'image' => '/images/photo3.jpg'
                ],
                [
                    'title' => '@Clyde_Douglas',
                    'des' => '',
                    'content' => '',
                    'icon' => '',
                    'image' => '/images/photo4.jpg'
                ],
                [
                    'title' => '@Clyde_Douglas',
                    'des' => '',
                    'content' => '',
                    'icon' => '',
                    'image' => '/images/photo5.jpg'
                ],
                [
                    'title' => '@Clyde_Douglas',
                    'des' => '',
                    'content' => '',
                    'icon' => '',
                    'image' => '/images/photo6.jpg'
                ],
                [
                    'title' => '@Clyde_Douglas',
                    'des' => '',
                    'content' => '',
                    'icon' => '',
                    'image' => '/images/photo7.jpg'
                ],
                [
                    'title' => '@Clyde_Douglas',
                    'des' => '',
                    'content' => '',
                    'icon' => '',
                    'image' => '/images/photo8.jpg'
                ],
                [
                    'title' => '@Clyde_Douglas',
                    'des' => '',
                    'content' => '',
                    'icon' => '',
                    'image' => '/images/photo9.jpg'
                ],
                [
                    'title' => '@Clyde_Douglas',
                    'des' => '',
                    'content' => '',
                    'icon' => '',
                    'image' => '/images/photo10.jpg'
                ],
                [
                    'title' => '@Clyde_Douglas',
                    'des' => '',
                    'content' => '',
                    'icon' => '',
                    'image' => '/images/photo11.jpg'
                ],
                [
                    'title' => '@Clyde_Douglas',
                    'des' => '',
                    'content' => '',
                    'icon' => '',
                    'image' => '/images/photo12.jpg'
                ],
            ],
        ]);
        Config::create([
            'cfg_id' => 110,
            'cfg_name' => 'Academy intro',
            'cfg_title' => 'Academy intro',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => 'Professional footballers  start here',
                    'des' => '',
                    'content' => 'Practice makes permanent. Our weekly group training is a great foundation for players wanting to move into local grassroots clubs or professional academies. We’ve had over 200 players signed professionally so far.',
                    'icon' => '',
                    'image' => '/images/img1.jpg'
                ],
                [
                    'title' => 'The weather  won’t stop us',
                    'des' => '',
                    'content' => 'We have indoor and outdoor fields so your child is always comfortable. We focus on technique in small spaces during winter, so they can experiment on larger fields in summer.',
                    'icon' => '',
                    'image' => '/images/img2.jpg'
                ],
                [
                    'title' => 'Sign up for a block - not the whole year',
                    'des' => '',
                    'content' => "We plan a thorough one year syllabus, but that doesn’t mean you need to commit to the whole year at once. We keep our weekly group training flexible with block session arrangements too. ",
                    'icon' => '',
                    'image' => '/images/img3.jpg'
                ],
            ],
        ]);
        Config::create([
            'cfg_id' => 111,
            'cfg_name' => 'Each Week',
            'cfg_title' => 'Each week is different. A typical block booking includes this:',
            'cfg_des' => '',
            'cfg_content' => '',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => 'Technique',
                    'des' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu urna eu libero blandit efficitur sit amet in elit. Morbi viverra lacinia dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu urna eu libero blandit efficitur sit amet in elit. Morbi viverra lacinia dui",
                    'content' => '',
                    'icon' => '',
                    'image' => 'images/gallery1.jpg'
                ],
                [
                    'title' => 'Technique',
                    'des' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu urna eu libero blandit efficitur sit amet in elit. Morbi viverra lacinia dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu urna eu libero blandit efficitur sit amet in elit. Morbi viverra lacinia dui",
                    'content' => '',
                    'icon' => '',
                    'image' => 'images/gallery2.jpg'
                ],
                [
                    'title' => 'Technique',
                    'des' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu urna eu libero blandit efficitur sit amet in elit. Morbi viverra lacinia dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu urna eu libero blandit efficitur sit amet in elit. Morbi viverra lacinia dui",
                    'content' => '',
                    'icon' => '',
                    'image' => 'images/gallery5.jpg'
                ],
                [
                    'title' => 'Technique',
                    'des' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu urna eu libero blandit efficitur sit amet in elit. Morbi viverra lacinia dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu urna eu libero blandit efficitur sit amet in elit. Morbi viverra lacinia dui",
                    'content' => '',
                    'icon' => '',
                    'image' => 'images/gallery2.jpg'
                ],
                [
                    'title' => 'Technique',
                    'des' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu urna eu libero blandit efficitur sit amet in elit. Morbi viverra lacinia dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu urna eu libero blandit efficitur sit amet in elit. Morbi viverra lacinia dui",
                    'content' => '',
                    'icon' => '',
                    'image' => 'images/gallery1.jpg'
                ],
                [
                    'title' => '',
                    'des' => "",
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => "",
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => "",
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => "",
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => "",
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
            ],
        ]);
        Config::create([
            'cfg_id' => 112,
            'cfg_name' => '4 skills your child will learn:',
            'cfg_title' => '4 skills your child will learn:',
            'cfg_des' => '',
            'cfg_content' => '',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => 'Technical',
                    'des' => "We teach your child the core fundamentals, such as passing or shooting, to help them become more technically-gifted footballers. We then reinforce it with 1-on-1 practice against another player with the same ability to boost decision-making alongside technique.",
                    'content' => '',
                    'icon' => '/images/Bitmap1.jpg',
                    'image' => ''
                ],
                [
                    'title' => 'Social',
                    'des' => "We keep our sessions to 10 children per coach. This guarantees that your child gets the attention they deserve and the coaching they’re after. It also makes it easier to build everlasting friendships for children who find large group situations challenging. ",
                    'content' => '',
                    'icon' => '/images/Bitmap2.jpg',
                    'image' => ''
                ],
                [
                    'title' => 'Physical',
                    'des' => "The 10 session are about getting your child moving and physically strong. These sessions help build fundamental physical skills that the child can use as they grow older or in other sports. Not only does it help with physical fitness, but with speed and agility too.",
                    'content' => '',
                    'icon' => '/images/Bitmap3.jpg',
                    'image' => ''
                ],
                [
                    'title' => 'Psychology',
                    'des' => "Our unique sessions also help with cognitive function. You will see your child develop better concentration, learning, listening, and decision-making skills week after week. ",
                    'content' => '',
                    'icon' => '/images/Bitmap4.jpg',
                    'image' => ''
                ],
            ],
        ]);
        Config::create([
            'cfg_id' => 113,
            'cfg_name' => 'Why WMF',
            'cfg_title' => 'Why WMF is the perfect place for your child',
            'cfg_des' => '',
            'cfg_content' => '',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => 'Fun for every one',
                    'des' => "We make football fun for every child. Our personalised coaching is for any child aged 4-12 years old no matter their experience nor ability.",
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => 'Experts at junior football training',
                    'des' => "We are rated 9.9 out of 10 based on 189 reviews on TrustPilot. With 16 venues throughout England and from a cost of £XXX per weekly session, we offer value for money and eas",
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => 'Coaches that care',
                    'des' => "We only employ the best coaches who have a love of football and the next generation. Every coach and attendant on the field has also had First Aid training for a safe sporting environment and is DBS verified.",
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => 'Smiles first, career second',
                    'des' => "We always focus on smiles, but have the networks you need to guide your child into the professional world too.",
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => 'Only the best places to play',
                    'des' => "We offer both indoor and outdoor fields, so we can play in any weather. This also helps develop your child’s football technique on different terrains to become a better all-round player.",
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => 'A safe, welcoming environment',
                    'des' => "We ensure a safe environment for your child with regular risk assessments, and anti-bullying and nut-free policies.",
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
            ],
        ]);
        Config::create([
            'cfg_id' => 114,
            'cfg_name' => 'About Weekly Training',
            'cfg_title' => 'Weekly Football Coaching In',
            'cfg_des' => 'Group football training in Isleworth for your child every week of the school term. Just find a day and time that suits you.',
            'cfg_content' => 'https://www.youtube.com/embed/iEEaMzR3MuY',
            'cfg_alias' => null,
            'cfg_order' => 0
        ]);
        Config::create([
            'cfg_id' => 115,
            'cfg_name' => 'About Holiday Camps',
            'cfg_title' => 'School Holiday Camps',
            'cfg_des' => 'Week-long camps every school holiday where football meets fun. Attend as much or little as you like',
            'cfg_content' => 'https://www.youtube.com/embed/iEEaMzR3MuY',
            'cfg_alias' => null,
            'cfg_order' => 0
        ]);

        Config::create([
            'cfg_id' => 116,
            'cfg_name' => 'Typical day on Camp',
            'cfg_title' => 'What can you expect? A typical day on camp:',
            'cfg_des' => '',
            'cfg_content' => '',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => 'Welcome and Registration',
                    'des' => "Coaches do a meet-and-greet and organise groups based on age and ability. If your child is nervous, we recommend getting there at 10am for kick-off so we can overcome those fears early.",
                    'content' => '9:30AM - 10AM',
                    'icon' => '',
                    'image' => 'images/gallery1.jpg'
                ],
                [
                    'title' => 'Welcome and Registration',
                    'des' => "Coaches do a meet-and-greet and organise groups based on age and ability. If your child is nervous, we recommend getting there at 10am for kick-off so we can overcome those fears early.",
                    'content' => '9:30AM - 10AM',
                    'icon' => '',
                    'image' => 'images/gallery2.jpg'
                ],
                [
                    'title' => 'Welcome and Registration',
                    'des' => "Coaches do a meet-and-greet and organise groups based on age and ability. If your child is nervous, we recommend getting there at 10am for kick-off so we can overcome those fears early.",
                    'content' => '9:30AM - 10AM',
                    'icon' => '',
                    'image' => 'images/gallery5.jpg'
                ],
                [
                    'title' => 'Welcome and Registration',
                    'des' => "Coaches do a meet-and-greet and organise groups based on age and ability. If your child is nervous, we recommend getting there at 10am for kick-off so we can overcome those fears early.",
                    'content' => '9:30AM - 10AM',
                    'icon' => '',
                    'image' => 'images/gallery1.jpg'
                ],
                [
                    'title' => 'Welcome and Registration',
                    'des' => "Coaches do a meet-and-greet and organise groups based on age and ability. If your child is nervous, we recommend getting there at 10am for kick-off so we can overcome those fears early.",
                    'content' => '9:30AM - 10AM',
                    'icon' => '',
                    'image' => 'images/gallery5.jpg'
                ],

                [
                    'title' => '',
                    'des' => "",
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => "",
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => "",
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => "",
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => "",
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
            ],
        ]);

        Config::create([
            'cfg_id' => 117,
            'cfg_name' => 'About 1on1 Training',
            'cfg_title' => '1-on-1 Football Training',
            'cfg_des' => 'Personalised and high energy football training by a professional coach just for your child',
            'cfg_content' => 'images/image_about.png',
            'cfg_alias' => null,
            'cfg_order' => 0
        ]);

        Config::create([
            'cfg_id' => 118,
            'cfg_name' => 'Training intro',
            'cfg_title' => 'Training intro',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => 'Learn the basics',
                    'des' => '',
                    'content' => 'Some children take longer to learn the basics of the game than others, and our 1-on-1 football training provides a more nurturing environment in which they can develop. We often find when children become more accomplished with the basics, they enjoy their football far more.',
                    'icon' => '',
                    'image' => '/images/img1.jpg'
                ],
                [
                    'title' => 'Extra Support',
                    'des' => '',
                    'content' => 'Children develop at different rates and we understand that each player is unique. 1-on-1 sessions allow players to work on targeted areas of their game to overcome obstacles in their football journey.',
                    'icon' => '',
                    'image' => '/images/img2.jpg'
                ],
                [
                    'title' => 'Achieve Dreams',
                    'des' => '',
                    'content' => "For those players who are determined to play at a professional academy, we do offer 1-on-1 coaching designed to help them achieve their goals. However, We Make Footballers are careful of managing the expectations of children and parents and offer guidance throughout the journey.",
                    'icon' => '',
                    'image' => '/images/img3.jpg'
                ],
            ],
        ]);

        Config::create([
            'cfg_id' => 119,
            'cfg_name' => 'About Birthday party in',
            'cfg_title' => 'Birthday Parties',
            'cfg_des' => 'Birthday parties for kids with We Make Footballers. Create a day for your child they will never forget!',
            'cfg_content' => 'images/image_about.png',
            'cfg_alias' => null,
            'cfg_order' => 0
        ]);
        Config::create([
            'cfg_id' => 120,
            'cfg_name' => 'About Birthday party',
            'cfg_title' => 'Birthday Parties 2',
            'cfg_des' => 'Whether you are a WMF customer or not, why not make
                            your child’s day even more special, by booking their
                            favourite coach for their birthday! We take great
                            care and pride in the birthday parties we offer the
                            families we work with. Take a look at our Birthday
                            parties and the packages we offer to make your
                            child’s day one they will never forget! Our coaches
                            are best in class!',
            'cfg_content' => '',
            'cfg_alias' => null,
            'cfg_order' => 0
        ]);

        Config::create([
            'cfg_id' => 121,
            'cfg_name' => 'Key element birthday party',
            'cfg_title' => 'What are the key elements to football birthday parties?',
            'cfg_des' => '',
            'cfg_content' => '',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => '',
                    'des' => "Experienced Senior Coaches take the lead and ensure that everyone has a great time.",
                    'content' => '',
                    'icon' => '/images/Bitmap1.jpg',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => "All ages and abilities  are catered for with enjoyable games fit for all to take part. We will bring all the equipment.",
                    'content' => '',
                    'icon' => '/images/Bitmap2.jpg',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => "Fun and memorable aspects of just playing football – We Make Footballers know when  to have fun!",
                    'content' => '',
                    'icon' => '/images/Bitmap3.jpg',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => "Safety – it is imperative we are still able to control the children’s behaviour and keep the party safe!",
                    'content' => '',
                    'icon' => '/images/Bitmap4.jpg',
                    'image' => ''
                ],
            ],
        ]);
        Config::create([
            'cfg_id' => 122,
            'cfg_name' => 'Birthday Package',
            'cfg_title' => 'Check out our Birthday Packages',
            'cfg_des' => '',
            'cfg_content' => '',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => 'Silver Package',
                    'des' => 'Includes: 1-12 children, Single Coach',
                    'content' => 'WMF Senior coach (You can request your child’s favourite!) 1 hour WMF bespoke session designed for the ability and age range of the children at the party. (Children can choose their favourite games 2 days before the party – we send the options!)',
                    'icon' => '90',
                    'image' => '/images/img1.png'
                ],
                [
                    'title' => 'Gold Package',
                    'des' => 'Includes: 12-24 children, Single Coach',
                    'content' => 'WMF Senior coach (You can request your child’s favourite!) 1 hour WMF bespoke session designed for the ability and age range of the children at the party. (Children can choose their favourite games 2 days before the party – we send the options!)',
                    'icon' => '140',
                    'image' => '/images/img2.png'
                ],
                [
                    'title' => 'Premium Package',
                    'des' => 'Includes: 24+ children, Single Coach',
                    'content' => "WMF Senior coach (You can request your child’s favourite!) 1 hour WMF bespoke session designed for the ability and age range of the children at the party. (Children can choose their favourite games 2 days before the party – we send the options!)",
                    'icon' => '190',
                    'image' => '/images/img3.png'
                ],
            ],
        ]);
        Config::create([
            'cfg_id' => 123,
            'cfg_name' => 'Party Include',
            'cfg_title' => 'Party inclusions in every package',
            'cfg_des' => '',
            'cfg_content' => '',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => '',
                    'des' => '',
                    'content' => 'Equipment: goals, footballs, bibs and cones',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => '',
                    'content' => 'Set up, pack away, and travel to the agreed location',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => '',
                    'content' => 'Official WMF party invites',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => '',
                    'content' => 'Lifetime memory!',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => '',
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],

            ],
        ]);
        Config::create([
            'cfg_id' => 124,
            'cfg_name' => 'Optional extras',
            'cfg_title' => 'Optional extras',
            'cfg_des' => '',
            'cfg_content' => '',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => '',
                    'des' => '£2 each',
                    'content' => 'Medals for every child',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => '£20',
                    'content' => 'Personalised Player of Day Giant Trophy (an ideal prize for birthday child)',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => '',
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => '',
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => '',
                    'des' => '',
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],

            ],
        ]);
        Config::create([
            'cfg_id' => 125,
            'cfg_name' => 'About WMF',
            'cfg_title' => 'About We Make Footballers',
            'cfg_des' => 'The UK’s most trusted junior football coaching',
            'cfg_content' => 'We believe that England needs a stronger grassroots program if the next generation are to love the sport, and bring England our second world cup. While grassroots is the heartbeat of kids loving football, parents are rarely trained or equiped to introduce the sport in those crucial early stages, especially with such large groups and little support.',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => '10 years',
                    'des' => '',
                    'content' => 'Ten years ago we started We Make Footballers to provide best in class football coaching for boys and girls of all abilities.',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => '46 academies',
                    'des' => '',
                    'content' => 'It’s grown to 46 academies around the country, each now feeding into a local grassroots team and professional club academies when the time is right.',
                    'icon' => '',
                    'image' => ''
                ],
            ],
        ]);
        Config::create([
            'cfg_id' => 126,
            'cfg_name' => 'About WMF 2',
            'cfg_title' => 'Guided discovery helps to develop creative problem solvers',
            'cfg_des' => '/images/info_guide.png',
            'cfg_content' => '<h4>200+ players signed at pro clubs</h4>
    <p>
        Over the years we’ve developed a discovery learning
        theory to make our training fun, but effective. With
        over 200 players signed to professional clubs, it
        seems to be working!
    </p>
    <h4>The right approach</h4>
    <p>
        We find if you give players all the answers, they
        get lazy. They don’t think for themselves. They
        can’t problem solve. We want to present situations
        in which the environment teaches them and they can
        learn continuously with no fear of making mistakes.
    </p>
    <blockquote>
        We Make Footballers believe in a combination of
        Learning Through Discovery, Guided Discovery and
        occasionally an Autocratic (controlling) coaching
        style.
    </blockquote>
    <p>
        Guided Discovery will often speed up the process in
        which the player finds the ‘right answer’. With
        trial and error, we are hoping the child gets the
        answer, however it may not come. The guidance points
        them in the right direction (the right direction is
        always open to interpretation).
    </p>',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [],
        ]);
        Config::create([
            'cfg_id' => 127,
            'cfg_name' => 'About WMF 3',
            'cfg_title' => 'We recruit the best young coaches in the country',
            'cfg_des' => '',
            'cfg_content' => 'We are the strength of our coaching, and we’ve gone
                            a long way to find the best junior football coaches
                            in the country. <br />
                            <br />
                            Our coaches are professional highly trained people
                            who have a talent and passion for coaching and
                            teaching! With continual professional development
                            and the monitoring of each coaches progression
                            within the company, we are able to keep our team
                            motivated and passionate every session. <br />
                            <br />
                            In addition to encouraging our coaches to pursue
                            further FA Qualifications, we have developed our own
                            We make Footballers coach training course which
                            allows our staff to flourish. This ensures we keep
                            consistent quality each and every week.',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => 'Qualified, energetic coaching',
                    'des' => '',
                    'content' => 'Our academy managers are, at minimum, FA level 3 qualified, with younger coaches Level 1 and 2 qualified. We also hold our own WMF exams which coaches must complete. The majority of our coaches have played at a very high level & are trained to provide a creative, imaginitive environment.',
                    'icon' => '',
                    'image' => '/images/img1.jpg'
                ],
                [
                    'title' => 'Safe & secure at all times',
                    'des' => '',
                    'content' => 'All of our staff members go through an extensive training programme which ensures you know your children are 100% safe in our care. Every coach must hold a valid DBS check before they can being working with any children.',
                    'icon' => '',
                    'image' => '/images/img2.jpg'
                ],
                [
                    'title' => 'Great facilities - rain, hail or shine',
                    'des' => '',
                    'content' => "We take great pride in the facilities we rent and always ensure we have access to indoor and outdoor facilities during the winter months, which means our training is rarely cancelled!",
                    'icon' => '',
                    'image' => '/images/img3.jpg'
                ],
            ],
        ]);
        Config::create([
            'cfg_id' => 128,
            'cfg_name' => 'About WMF 4',
            'cfg_title' => 'Classes from £X per week at an academy near you',
            'cfg_des' => '/images/info_guide_2.png',
            'cfg_content' => '<p>
        We Make Footballers is able to offer a high level of coaching at the best facilities while still keeping our prices at an affordable level. 
        We’re passionate about helping every child become the best footballer they can be and we always ensure that each parent leaves feeling that 
        we have delivered a session with great value for their money.
    </p>
    <blockquote>
        We Make Footballers believe in a combination of Learning Through Discovery, 
        Guided Discovery and occasionally an Autocratic (controlling) coaching style.
    </blockquote>',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [],
        ]);
        Config::create([
            'cfg_id' => 129,
            'cfg_name' => 'About WMF 5',
            'cfg_title' => 'What type of coaching suits you?',
            'cfg_des' => 'From beginners to the next big name, both training packages are suited to children of all abilities.',
            'cfg_alias' => null,
            'cfg_content' => '',
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => 'Weekly Group Training',
                    'des' => 'A fresh class every week. Our 39-week school term schedule focuses on a new football fundamental each week along with 1-on-1 practice. Just find a day and time that suits you.',
                    'content' => '',
                    'icon' => '/images/icon-people.png',
                    'image' => ''
                ],
                [
                    'title' => 'School Holiday Camps',
                    'des' => 'The football fundamentals complete with games, matches, tournaments, and catering. Our week-long school holiday camps focus on first-timers, friendship, and children seeking faster progression.',
                    'content' => '',
                    'icon' => '/images/icon-bell.png',
                    'image' => ''
                ]
            ],
        ]);
        Config::create([
            'cfg_id' => 130,
            'cfg_name' => 'Service Landing page',
            'cfg_title' => 'Service Landing page',
            'cfg_des' => '',
            'cfg_alias' => null,
            'cfg_content' => '',
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => 'Weekly Training',
                    'des' => '',
                    'content' => 'Sed quis ultricies velit, in dignissim purus. Donec ultricies, metus et varius ullamcorper, diam tellus imperdiet nulla, vel suscipit libero urna egestas risus. Pellentesque non massa fringilla, cursus tortor sed, lacinia nisl. Morbi semper accumsan massa at iaculis. Cras ac rutrum odio. Nam tristique metus sed arcu aliquam elementum. Suspendisse potenti.',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => 'Holiday Camps',
                    'des' => 'TWeek-long camps every school holiday where football meets fun. Attend as much or little as you like. ',
                    'content' => 'Our holiday camps are catered to any child aged 4-12 years old. Whether you are a beginner or looking to join a professional academy, our football holiday camps are structured to suit everyone. We have indoor and outdoor fields so your child is always comfortable. We focus on technique in small spaces during winter, so they can experiment on larger fields in summer. ',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => '1 on 1 Training',
                    'des' => 'Personalised and high energy football training by a professional coach just for your child.',
                    'content' => 'Some children take longer to learn the basics of the game than others, and our 1-on-1 football training provides a more nurturing environment in which they can develop. We often find when children become more accomplished with the basics, they enjoy their football far more. Children develop at different rates and we understand that each player is unique. 1-on-1 sessions allow players to work on targeted areas of their game to overcome obstacles in their football journey.',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => 'Birthday Party',
                    'des' => 'Birthday parties for kids with We Make Footballers. Create a day for your child they will never forget!',
                    'content' => 'Whether you are a WMF customer or not, why not make your child’s day even more special, by booking their favourite coach for their birthday! We take great care and pride in the birthday parties we offer the families we work with. Take a look at our Birthday parties and the packages we offer to make your child’s day one they will never forget! Our coaches are best in class!',
                    'icon' => '',
                    'image' => ''
                ],
                [
                    'title' => 'School Training',
                    'des' => '',
                    'content' => 'We Make Footballers believe we offer one of the top school football coaching programmes in the country. Running the best in class coaching programme outside of schools gives us access to some of the top coaches in the UK. We also have an intensive training programme that all of our coaches go through, to ensure quality stays at the highest of standards at all times.',
                    'icon' => '',
                    'image' => ''
                ]
            ],
        ]);

        Config::create([
            'cfg_id' => 131,
            'cfg_name' => 'WMF Contact Info',
            'cfg_title' => 'WMF Contact Info',
            'cfg_des' => '',
            'cfg_alias' => null,
            'cfg_content' => '',
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => 'Address',
                    'des' => 'https://facebook.com ',
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],[
                    'title' => 'Phone',
                    'des' => 'https://facebook.com ',
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],[
                    'title' => 'Email',
                    'des' => 'https://facebook.com ',
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],[
                    'title' => 'Facebook',
                    'des' => 'https://facebook.com ',
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],[
                    'title' => 'Twitter',
                    'des' => 'https://facebook.com ',
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],[
                    'title' => 'Insta',
                    'des' => 'https://facebook.com ',
                    'content' => '',
                    'icon' => '',
                    'image' => ''
                ],
            ],
        ]);
        Config::create([
            'cfg_id' => 132,
            'cfg_name' => 'Policy',
            'cfg_title' => 'We Make Footballers Policies',
            'cfg_des' => 'To be the UK’s most trusted junior football coaching, we ensure every academy follows our strict policies',
            'cfg_content' => 'Every single one of our customers deserves a safe, fun and enjoyable experience at our training sessions. While we will always work on improving the social, environmental and quality of our training, we know that we must always adhere to our core policies which are detailed within each of the cards below.',
            'cfg_alias' => null,
            'cfg_order' => 0,
            'cfg_value' => [
                [
                    'title' => 'Child Welfare',
                    'des' => "We Make Footballers acknowledges its responsibility to safeguard the welfare of every child and young person who has been entrusted to its care and is committed to working to provide a safe environment for all members.",
                    'content' => '<h2>Anti Bullying Policy</h2>
<p><strong>STATEMENT OF INTENT</strong></p>
<p>
	We are committed to providing a caring, friendly and safe environment for all of our staff, players and their families so they can participate in football in a relaxed and secure atmosphere. Bullying of any kind is unacceptable. If bullying does occur, all staff, players and their families should be able to report and know that the incident\/s will be dealt with promptly and effectively.</p>
<div style="background-color: #f2f2f2; padding: 16px;">
	<p><strong>WHAT IS BULLYING?</strong></p>
	<p>Bullying is the use of aggression with the intention of hurting another person. Bullying results in pain and distress to the victim. Bullying can be:</p></div>',
                    'icon' => '/images/icon-shield.png',
                    'image' => ''
                ],
                [
                    'title' => 'Anti-bullying',
                    'des' => "We are committed to providing a caring, friendly and safe environment for all of our staff, players and their families so they can participate in football in a relaxed and secure atmosphere. Bullying of any kind is unacceptable and our policy provides guideence on reporting and how we aim to stamp it out of all our training.",
                    'content' => '',
                    'icon' => '/images/icon-people.png',
                    'image' => ''
                ],
                [
                    'title' => 'Equality & Deversity',
                    'des' => "We Make Footballers are committed to encouraging equality and diversity among our workforce, and eliminating unlawful discrimination. We Make Footballers are committed against unlawful discrimination of customers or the public.",
                    'content' => '',
                    'icon' => '/images/icon-heart.png',
                    'image' => ''
                ],
                [
                    'title' => 'Privacy',
                    'des' => "We know that you care how information about you is stored, used and shared and we appreciate your trust in us to do that carefully and sensibly. This notice describes our means of storing your data, using your data, and protecting your data.",
                    'content' => '',
                    'icon' => '/images/icon-lock.png',
                    'image' => ''
                ],
            ],
        ]);
    }

}

import { useState, useRef, useEffect, ReactElement } from 'react';
import {
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosArrowForward,
  IoMdDocument,
} from 'react-icons/io';
import { FaFileInvoice, FaHouse, FaPaperPlane } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const BottomHeader = () => {
  const depthLevel = 0;
  return (
    <nav className="desktop-nav bg-primary-500 py-5 relative">
      <div className="container">
        <ul className="menus flex flex-row justify-between">
          {menuItemsData.map((menu, index) => {
            return (
              <SingleNavItem menu={menu} key={index} depthLevel={depthLevel} />
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default BottomHeader;

const SingleNavItem = ({
  menu,
  depthLevel,
}: {
  menu: MenuItems;
  depthLevel: number;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', (event) =>
      handleClickOutside(event)
    );

    //Clean up function => Cleaning up our Event Listeners
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <>
      <li
        className="menu-items flex flex-row items-center justify-center
        text-white italic font-bold text-lg gap-1 p-0 relative
        "
        ref={menuRef}
      >
        <FaHouse />
        {menu.submenu ? (
          <>
            <button
              type="button"
              aria-haspopup="menu"
              className="p-0 "
              aria-expanded={isDropdownOpen ? 'true' : 'false'}
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
              }}
            >
              {menu.title}{' '}
              {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
            <DropdownMenu
              submenus={menu.submenu}
              isOpen={isDropdownOpen}
              depthLevel={depthLevel}
              type={menu.type === 'megamenu' ? 'megamenu' : 'normal'}
            />
          </>
        ) : (
          <a href={menu.url}>{menu.title}</a>
        )}
      </li>
    </>
  );
};

export const DropdownMenu = ({
  submenus,
  isOpen,
  depthLevel,
  type,
}: {
  submenus: {
    title: string;
    url: string;
  }[];
  isOpen: boolean;
  depthLevel: number;
  type: 'normal' | 'megamenu';
}) => {
  return (
    <>
      {type === 'megamenu' ? (
        <MegaMenuList isOpen={isOpen} />
      ) : (
        <NormalMenuList isOpen={isOpen} />
      )}
    </>
  );
};

export const NormalMenuList = ({ isOpen }: { isOpen: boolean }) => {
  const menus: { title: string; href: string; icon: ReactElement }[] = [
    {
      title: 'Orders',
      href: '/docs/primitives/alert-dialog',
      icon: <IoMdDocument />,
    },
    {
      title: 'Invoice',
      href: '/docs/primitives/progress',
      icon: <FaFileInvoice />,
    },
    {
      title: 'Statements',
      href: '/docs/primitives/hover-card',
      icon: <FaPaperPlane />,
    },
  ];
  return (
    <>
      <ul
        className={`${
          isOpen ? 'opacity-100' : 'opacity-0'
        } transition-opacity flex min-w-[233px] flex-col border-2 bg-white p-3 shadow-xl md:min-w-[233px] mt-4 submenu-nav mx-5 absolute text-black top-10 dropdown-content gap-4`}
      >
        {menus.map((component) => (
          <li className="flex items-center gap-1 ">
            {component.icon}{' '}
            <h5 className="italic font-bold text-lg">{component.title}</h5>
          </li>
        ))}
      </ul>
    </>
  );
};
export const MegaMenuList = ({ isOpen }: { isOpen: boolean }) => {
  const subMenus = [
    {
      id: 1,
      menu: 'Machines',
      subMenu: 'Welders',
      items: [
        {
          id: 1,
          title: 'MIG Welders',
          link: '/mig-welders',
        },
        {
          id: 2,
          title: 'TIG Welders',
          link: '/tig-welders',
        },
        {
          id: 3,
          title: 'STICK Welders',
          link: '/tig-welders',
        },
        {
          id: 4,
          title: 'Multi Process Welders',
          link: '/tig-welders',
        },
      ],
    },
    {
      id: 2,
      menu: 'Safety',
      subMenu: 'Power Packs',
      items: [
        {
          id: 1,
          title: 'MIG Welders',
          link: '/mig-welders',
        },
        {
          id: 2,
          title: 'TIG Welders',
          link: '/tig-welders',
        },
        {
          id: 3,
          title: 'STICK Welders',
          link: '/tig-welders',
        },
        {
          id: 4,
          title: 'Multi Process Welders',
          link: '/tig-welders',
        },
      ],
    },
    {
      id: 3,
      menu: 'Statements',
      subMenu: 'Plasma Cutting',
      items: [
        {
          id: 1,
          title: 'MIG Welders',
          link: '/mig-welders',
        },
        {
          id: 2,
          title: 'TIG Welders',
          link: '/tig-welders',
        },
        {
          id: 3,
          title: 'STICK Welders',
          link: '/tig-welders',
        },
        {
          id: 4,
          title: 'Multi Process Welders',
          link: '/tig-welders',
        },
      ],
    },
    {
      id: 4,
      menu: 'Accessories',
      subMenu: 'Plasma Cutting',
      items: [
        {
          id: 1,
          title: 'MIG Welders',
          link: '/mig-welders',
        },
        {
          id: 2,
          title: 'TIG Welders',
          link: '/tig-welders',
        },
        {
          id: 3,
          title: 'STICK Welders',
          link: '/tig-welders',
        },
        {
          id: 4,
          title: 'Multi Process Welders',
          link: '/tig-welders',
        },
      ],
    },
    {
      id: 5,
      menu: 'Gas Equipment',
      subMenu: 'Plasma Cutting',
      items: [
        {
          id: 1,
          title: 'MIG Welders',
          link: '/mig-welders',
        },
        {
          id: 2,
          title: 'TIG Welders',
          link: '/tig-welders',
        },
        {
          id: 3,
          title: 'STICK Welders',
          link: '/tig-welders',
        },
        {
          id: 4,
          title: 'Multi Process Welders',
          link: '/tig-welders',
        },
      ],
    },
    {
      id: 4,
      menu: 'Accessories',
      subMenu: 'Plasma Cutting',
      items: [
        {
          id: 1,
          title: 'MIG Welders',
          link: '/mig-welders',
        },
        {
          id: 2,
          title: 'TIG Welders',
          link: '/tig-welders',
        },
        {
          id: 3,
          title: 'STICK Welders',
          link: '/tig-welders',
        },
        {
          id: 4,
          title: 'Multi Process Welders',
          link: '/tig-welders',
        },
      ],
    },
  ];
  return (
    <nav
      className={`${
        isOpen ? 'opacity-100' : 'opacity-0'
      } transition-opacity max-w-[723px]  p-4  text-black shadow-xl absolute bg-white top-16`}
    >
      <ul className="flex max-w-[217px] flex-col space-y-2 text-white submenu-nav">
        {subMenus?.map((subMenu) => (
          <li
            key={subMenu.id}
            className="group/menu relative italic font-bold text-lg text-grey-900 flex menu-hov"
          >
            <span className="rounded px-2 py-1 font-medium text-lg flex flex-row-reverse items-center menu-hov">
              {' '}
              <IoIosArrowForward />
              {subMenu.menu}
            </span>
            <ul className="absolute left-full top-0 mt-0 flex hidden  space-y-2 rounded  px-3 group-hover/menu:block w-[217px]">
              <li className="group/submenu relative normal text-lg text-grey-900 flex menu-hov">
                <span className="px-2 py-1 menu-hover font-medium not-italic text-lg flex  items-center">
                  {subMenu.subMenu}
                  <IoIosArrowForward />
                </span>
                <ul className="absolute left-full top-0 mt-0 flex hidden flex-col space-y-2 rounded bg-gray-700 p-2 group-hover/submenu:block w-[217px]">
                  {subMenu.items?.map((item) => (
                    <Link to={item.link}>
                      <li className="px-2 py-1 hover:bg-gray-600">
                        {item?.title}
                      </li>
                    </Link>
                  ))}
                </ul>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const menuItemsData = [
  {
    title: 'Home',
    url: '/',
    type: 'link',
  },
  {
    title: 'Accounts',
    type: 'normal',
    submenu: [
      { title: 'Orders', url: '/orders' },
      { title: 'Orders', url: '/orders' },
      { title: 'Orders', url: '/orders' },
    ],
  },
  {
    title: 'Product',
    type: 'megamenu',
    submenu: [
      {
        title: 'Web Design',
        url: 'web-design',
      },
      {
        title: 'Web Development',
        url: 'web-dev',
        submenu: [
          {
            title: 'Frontend',
            url: 'frontend',
          },
          {
            title: 'Backend',
            submenu: [
              {
                title: 'NodeJS',
                url: 'node',
              },
              {
                title: 'PHP',
                url: 'php',
              },
            ],
          },
        ],
      },
      {
        title: 'SEO',
        url: 'seo',
      },
    ],
  },
  {
    title: 'Content Management',
    type: 'normal',
    submenu: [
      { title: 'Orders', url: '/orders' },
      { title: 'Orders', url: '/orders' },
      { title: 'Orders', url: '/orders' },
    ],
  },
  {
    title: 'My Team',
    type: 'link',
    url: '/about',
  },
  {
    title: 'Support',
    type: 'link',
    url: '/support',
  },
  {
    title: 'Resources',
    type: 'normal',
    submenu: [
      { title: 'Orders', url: '/orders' },
      { title: 'Orders', url: '/orders' },
      { title: 'Orders', url: '/orders' },
    ],
  },
  {
    title: 'Settings',
    type: 'link',
    url: '/settings',
  },
];
type MenuItems = (typeof menuItemsData)[0];

import React from "react";
import { useNavigate } from "react-router-dom";

const ScreenPrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <section className="text-black">
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="flex flex-col">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl font-bold sm:text-4xl">Privacy Policy</h1>
            <button
              className="inline-block shrink-0 rounded-md border border-gray-400 bg-gray-300 text-gray-500 px-12 py-3 text-sm font-medium transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-grey-500"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>


          <p className="mt-4 text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolores iure fugit totam
            iste obcaecati. Consequatur ipsa quod ipsum sequi culpa delectus, cumque id tenetur
            quibusdam, quos fuga minima.
          </p>

          <p className="mt-4 text-gray-400">
            Maecenas sollicitudin hendrerit sapien ac mattis. Maecenas auctor vel magna non dapibus. Phasellus vehicula porta consectetur. Nam volutpat tortor eget ante pellentesque, non tincidunt lacus accumsan. Phasellus lacinia enim molestie facilisis semper. Vivamus in elementum justo, nec porttitor libero. Fusce at urna auctor, ullamcorper libero at, pharetra leo. Integer imperdiet hendrerit lectus, quis vehicula tellus viverra ut. Etiam varius arcu rutrum varius rhoncus. Curabitur varius rutrum justo. Integer vitae justo gravida, eleifend massa id, mattis augue. Nullam porttitor lectus non lacus varius, at iaculis libero maximus. Morbi placerat nec quam id egestas. Morbi ac est quis mi aliquam pellentesque et eget neque. Maecenas fermentum facilisis dictum. Duis vel libero elementum metus rhoncus ultricies posuere vel arcu.
          </p>

          <p className="mt-4 text-gray-400">
            Proin urna quam, volutpat vel fringilla ut, bibendum in tortor. Fusce bibendum faucibus leo sit amet convallis. Etiam sed massa libero. Mauris eleifend, ipsum nec venenatis maximus, lectus felis consequat tortor, in congue ante justo at ex. Proin sit amet cursus ipsum. Vivamus eget enim varius, commodo ligula laoreet, dictum urna. Donec eget neque in metus fermentum convallis in non dolor. Nullam iaculis ultrices feugiat. Nulla scelerisque enim in diam ornare bibendum.
          </p>

          <p className="mt-4 text-gray-400">
            Cras ultricies volutpat lectus quis rhoncus. Etiam commodo mi in semper vehicula. Mauris sed est nulla. Vivamus pellentesque nisi lacinia hendrerit varius. Aliquam volutpat, neque vel ultricies auctor, dui ex accumsan arcu, sed blandit nunc arcu vitae est. Sed elementum elit enim, sed hendrerit lectus pharetra ac. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam sit amet odio in enim maximus consectetur.
          </p>
        </div>
      </div>
    </section>
  );
}
export default ScreenPrivacyPolicy;